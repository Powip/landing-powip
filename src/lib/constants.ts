export const DEMO_CALENDAR_LINK = 'https://calendar.app.google/fVSQPZVhXzcAyhHD6';

export const APP_URL = 'https://www.powip.tech';

/**
 * Link al onboarding con pago online (Flow) de la app. `appPlan` es el nombre del
 * plan en ms-subscription (BASIC→Basic, STANDARD→Medium, FULL→Scale); con
 * annual=true la app contrata "<plan> Anual".
 */
export function onboardingHref(appPlan: string, price: number, annual: boolean): string {
  return `${APP_URL}/onboarding?plan=${appPlan}&price=${price}${annual ? '&annual=true' : ''}`;
}
