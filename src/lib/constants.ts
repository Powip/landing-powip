export const DEMO_CALENDAR_LINK = 'https://calendar.app.google/fVSQPZVhXzcAyhHD6';

export const APP_URL = 'https://www.powip.tech';

/** Registro en la app: cuenta, plan, add-ons y pago en un solo flujo. */
export const ONBOARDING_URL = `${APP_URL}/onboarding`;

/**
 * Link al onboarding con pago online (Flow) de la app. `appPlan` es el nombre del
 * plan en ms-subscription (BASIC→Basic, STANDARD→Medium, FULL→Scale); con
 * annual=true la app preselecciona "<plan> Anual". El plan se puede cambiar en
 * el onboarding; el precio es solo informativo.
 */
export function onboardingHref(appPlan: string, price: number, annual: boolean): string {
  return `${APP_URL}/onboarding?plan=${appPlan}&price=${price}${annual ? '&annual=true' : ''}`;
}
