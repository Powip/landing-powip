export type OnboardingStep =
  | 'PLAN_SELECTION'
  | 'ADDONS'
  | 'REGISTRATION'
  | 'CARD_REDIRECT'
  | 'CARD_VERIFY'
  | 'SUBSCRIBE'
  | 'DONE'
  | 'ERROR';

export interface OnboardingState {
  step: OnboardingStep;
  planId: string | null;
  addOnIds: string[];
  userId: string | null;
  cardToken: string | null;
  subscriptionId: string | null;
  invoices: Invoice[] | null;
  error: string | null;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  annualPrice?: number;
  orders: string;
  features: string[];
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

// Shape real del backend
export interface BackendPlan {
  id: string;
  externalPlanId: string;
  name: string;
  currency: string;
  amount: number;
  interval: 'MONTHLY' | 'YEARLY';
  intervalCount: number;
  trialPeriodDays: number;
  periodsNumber: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface BackendAddOn {
  id: string;
  externalAddOnId: number;
  name: string;
  currency: string;
  amount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Invoice {
  id: string;
  amount: number;
  status: string;
  date: string;
}

export interface StoredOnboardingState {
  planId: string;
  addOnIds: string[];
  userId: string;
  cardToken: string;
  step: 'CARD_VERIFY';
}

export interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CreateSubscriptionData {
  planId: string;
  planAdditionalList: string[];
  trial_period_days: number;
  periods_number: number;
}
