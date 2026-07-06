'use client';

import { useCallback, useReducer } from 'react';
import type { OnboardingState, OnboardingStep, RegisterData } from '@/types/onboarding';
import { saveOnboardingState } from '@/lib/onboardingStorage';
import * as authService from '@/services/authService';
import * as customerService from '@/services/customerService';
import * as subscriptionService from '@/services/subscriptionService';

type OnboardingAction =
  | { type: 'SET_STEP'; step: OnboardingStep }
  | { type: 'SELECT_PLAN'; planId: string }
  | { type: 'SELECT_ADDONS'; addOnIds: string[] }
  | { type: 'SET_USER_ID'; userId: string }
  | { type: 'SET_CARD_TOKEN'; cardToken: string }
  | { type: 'SET_SUBSCRIPTION_ID'; subscriptionId: string }
  | { type: 'SET_INVOICES'; invoices: import('@/types/onboarding').Invoice[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'RESTORE'; state: Partial<OnboardingState> };

interface FullState extends OnboardingState {
  isLoading: boolean;
}

const initialState: FullState = {
  step: 'PLAN_SELECTION',
  planId: null,
  addOnIds: [],
  userId: null,
  cardToken: null,
  subscriptionId: null,
  invoices: null,
  error: null,
  isLoading: false,
};

function reducer(state: FullState, action: OnboardingAction): FullState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step, isLoading: false };
    case 'SELECT_PLAN':
      return { ...state, planId: action.planId, step: 'ADDONS' };
    case 'SELECT_ADDONS':
      return { ...state, addOnIds: action.addOnIds, step: 'REGISTRATION' };
    case 'SET_USER_ID':
      return { ...state, userId: action.userId };
    case 'SET_CARD_TOKEN':
      return { ...state, cardToken: action.cardToken };
    case 'SET_SUBSCRIPTION_ID':
      return { ...state, subscriptionId: action.subscriptionId };
    case 'SET_INVOICES':
      return { ...state, invoices: action.invoices, step: 'DONE', isLoading: false };
    case 'SET_ERROR':
      return { ...state, error: action.error, step: 'ERROR', isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading };
    case 'RESTORE':
      return { ...state, ...action.state };
    default:
      return state;
  }
}

export interface UseOnboardingFlowReturn {
  state: FullState;
  selectPlan: (planId: string) => void;
  selectAddOns: (addOnIds: string[]) => void;
  register: (data: RegisterData) => Promise<void>;
  initiateCardRegistration: () => Promise<void>;
  verifyCard: () => Promise<void>;
  subscribe: () => Promise<void>;
  isLoading: boolean;
  retry: () => void;
  restoreFromStorage: (stored: import('@/types/onboarding').StoredOnboardingState) => void;
}

const POLL_MAX_ATTEMPTS = 10;
const POLL_INTERVAL_MS = 3000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useOnboardingFlow(): UseOnboardingFlowReturn {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectPlan = useCallback((planId: string) => {
    dispatch({ type: 'SELECT_PLAN', planId });
  }, []);

  const selectAddOns = useCallback((addOnIds: string[]) => {
    dispatch({ type: 'SELECT_ADDONS', addOnIds });
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      await authService.register(data);
      const { userId } = await authService.login(data.email, data.password);
      dispatch({ type: 'SET_USER_ID', userId });
      await customerService.createCustomer();
      dispatch({ type: 'SET_STEP', step: 'CARD_REDIRECT' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error durante el registro';
      dispatch({ type: 'SET_ERROR', error: message });
    }
  }, []);

  const initiateCardRegistration = useCallback(async (): Promise<void> => {
    if (!state.userId || !state.planId) {
      dispatch({ type: 'SET_ERROR', error: 'Faltan datos del usuario o plan seleccionado' });
      return;
    }
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const { url, token } = await customerService.registerCard(state.userId);
      dispatch({ type: 'SET_CARD_TOKEN', cardToken: token });
      saveOnboardingState({
        planId: state.planId,
        addOnIds: state.addOnIds,
        userId: state.userId,
        cardToken: token,
        step: 'CARD_VERIFY',
      });
      window.location.href = url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar la tarjeta';
      dispatch({ type: 'SET_ERROR', error: message });
    }
  }, [state.userId, state.planId, state.addOnIds]);

  const verifyCard = useCallback(async (): Promise<void> => {
    if (!state.userId || !state.cardToken) {
      dispatch({ type: 'SET_ERROR', error: 'Datos de verificación incompletos' });
      return;
    }
    dispatch({ type: 'SET_STEP', step: 'CARD_VERIFY' });
    dispatch({ type: 'SET_LOADING', loading: true });

    for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
      try {
        const { status } = await customerService.getCardStatus(state.userId, state.cardToken);
        if (status === 'REGISTERED') {
          dispatch({ type: 'SET_STEP', step: 'SUBSCRIBE' });
          return;
        }
      } catch {
        // Continuar intentando hasta agotar intentos
      }
      if (attempt < POLL_MAX_ATTEMPTS) {
        await sleep(POLL_INTERVAL_MS);
      }
    }

    dispatch({
      type: 'SET_ERROR',
      error: 'No pudimos confirmar tu tarjeta. Intentalo de nuevo.',
    });
  }, [state.userId, state.cardToken]);

  const subscribe = useCallback(async (): Promise<void> => {
    if (!state.planId) {
      dispatch({ type: 'SET_ERROR', error: 'No hay un plan seleccionado' });
      return;
    }
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const { subscriptionId } = await subscriptionService.createSubscription({
        planId: state.planId,
        planAdditionalList: state.addOnIds,
        trial_period_days: 0,
        periods_number: 1,
      });
      dispatch({ type: 'SET_SUBSCRIPTION_ID', subscriptionId });
      const invoices = await subscriptionService.getInvoices(subscriptionId);
      dispatch({ type: 'SET_INVOICES', invoices });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al activar la suscripción';
      dispatch({ type: 'SET_ERROR', error: message });
    }
  }, [state.planId, state.addOnIds]);

  const retry = useCallback(() => {
    dispatch({ type: 'SET_STEP', step: 'CARD_REDIRECT' });
  }, []);

  const restoreFromStorage = useCallback(
    (stored: import('@/types/onboarding').StoredOnboardingState) => {
      dispatch({
        type: 'RESTORE',
        state: {
          planId: stored.planId,
          addOnIds: stored.addOnIds,
          userId: stored.userId,
          cardToken: stored.cardToken,
          step: stored.step,
        },
      });
    },
    [],
  );

  return {
    state,
    selectPlan,
    selectAddOns,
    register,
    initiateCardRegistration,
    verifyCard,
    subscribe,
    isLoading: state.isLoading,
    retry,
    restoreFromStorage,
  };
}
