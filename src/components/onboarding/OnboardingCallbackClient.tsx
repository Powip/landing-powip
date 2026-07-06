'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { getStoredOnboardingState } from '@/lib/onboardingStorage';
import { useOnboardingFlow } from '@/hooks/useOnboardingFlow';
import { CardVerifyHandler } from './CardVerifyHandler';
import { SubscriptionSuccess } from './SubscriptionSuccess';

export function OnboardingCallbackClient() {
  const { state, verifyCard, subscribe, retry, restoreFromStorage } = useOnboardingFlow();
  const restored = useRef(false);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;

    const stored = getStoredOnboardingState();
    if (!stored) return;

    restoreFromStorage(stored);
  }, [restoreFromStorage]);

  useEffect(() => {
    if (state.step === 'SUBSCRIBE') {
      subscribe();
    }
  }, [state.step, subscribe]);

  const stored = typeof window !== 'undefined' ? getStoredOnboardingState() : null;

  if (!stored && state.step === 'PLAN_SELECTION') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-gray-600 text-lg font-medium">
          Sesión expirada, volvé al inicio
        </p>
        <Link href="/" className="text-[#4F3A96] underline underline-offset-2 text-sm">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (state.step === 'DONE' && state.invoices) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <SubscriptionSuccess invoices={state.invoices} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <CardVerifyHandler
          onVerify={verifyCard}
          onRetry={retry}
          isError={state.step === 'ERROR'}
          errorMessage={state.error}
        />
      </div>
    </div>
  );
}
