import type { ApiErrorBody } from '@/lib/domain';
export type ErrorKind = 'http' | 'network' | 'timeout' | 'cancelled' | 'configuration' | 'contract' | 'duplicate';
const messages: Record<number, string> = { 401: 'Votre session a expiré. Reconnectez-vous.', 403: 'Vous n’avez pas l’autorisation d’effectuer cette action.', 404: 'Cette ressource est introuvable.', 419: 'La protection de session a expiré. Réessayez.', 422: 'Vérifiez les informations saisies.', 429: 'Trop de demandes. Veuillez patienter avant de réessayer.', 500: 'Le service Laravel rencontre une erreur. Réessayez plus tard.' };
export class ApiError extends Error {
  constructor(public status: number, public body: ApiErrorBody, public kind: ErrorKind = 'http', public retryAfter?: string) { super(body.message); this.name = 'ApiError'; }
}
export function httpError(status: number, payload: unknown, retryAfter?: string): ApiError {
  const body = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  const errors: Record<string, string[]> = {};
  if (body['errors'] && typeof body['errors'] === 'object') for (const [key, value] of Object.entries(body['errors'])) if (Array.isArray(value) && value.every(v => typeof v === 'string')) errors[key] = value;
  return new ApiError(status, { message: messages[status] ?? 'La demande n’a pas abouti.', errors }, 'http', retryAfter);
}
export const errorMessage = (error: unknown) => error instanceof ApiError ? error.message : 'La demande n’a pas abouti. Réessayez.';
