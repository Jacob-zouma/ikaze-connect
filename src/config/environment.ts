export type ApiMode = 'mock' | 'api';
export interface Environment { mode: ApiMode; appEnv: 'development' | 'test' | 'production'; baseUrl: string; origin: string; timeout: number; error?: string }
export function parseEnvironment(input: Record<string, unknown>): Environment {
  const mode = input['VITE_API_MODE'] ?? 'mock';
  const appEnv = input['VITE_APP_ENV'] ?? 'development';
  const raw = input['VITE_API_BASE_URL'];
  let error: string | undefined;
  let baseUrl = '', origin = '';
  if (mode !== 'mock' && mode !== 'api') error = 'Mode API invalide : choisissez mock ou api.';
  if (!['development', 'test', 'production'].includes(String(appEnv))) error = 'Environnement invalide.';
  if (raw) {
    try {
      const url = new URL(String(raw));
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || !url.pathname.endsWith('/api/v1')) throw new Error();
      if (appEnv === 'production' && url.protocol !== 'https:') throw new Error();
      baseUrl = url.href.replace(/\/$/, ''); origin = url.origin;
    } catch { error = 'URL Laravel invalide : utilisez une URL HTTP(S) terminant par /api/v1, HTTPS en production.'; }
  } else if (mode === 'api') error = 'Adresse de l’API Laravel manquante. Configurez VITE_API_BASE_URL.';
  const timeout = Number(input['VITE_API_TIMEOUT_MS'] ?? 15000);
  if (!Number.isInteger(timeout) || timeout < 100 || timeout > 120000) error = 'Délai API invalide (100 à 120000 ms).';
  return { mode: mode === 'api' ? 'api' : 'mock', appEnv: appEnv === 'production' ? 'production' : appEnv === 'test' ? 'test' : 'development', baseUrl, origin, timeout, error };
}
export const environment = parseEnvironment(import.meta.env);
export const isDemo = environment.mode === 'mock';
