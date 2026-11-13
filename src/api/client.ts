import { environment, type Environment } from '@/config/environment';
import { ApiError, httpError } from './errors';
export { ApiError } from './errors';
export interface RequestOptions extends Omit<RequestInit, 'body' | 'signal'> { body?: BodyInit | null; signal?: AbortSignal | null | undefined; timeout?: number; scope?: 'api' | 'origin'; responseType?: 'json' | 'blob'; dedupeKey?: string }
export function createHttpClient(config: Environment, transport: typeof fetch = (...args) => fetch(...args)) {
  const pending = new Set<string>();
  const listeners = new Set<() => void>();
  return {
    onUnauthorized(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
      if (config.error || !config.baseUrl) throw new ApiError(503, { message: config.error ?? 'L’API Laravel n’est pas encore connectée.' }, 'configuration');
      if (!path.startsWith('/') || path.startsWith('//') || path.includes('://') || path.split(/[/?]/).includes('..')) throw new ApiError(400, { message: 'Chemin API invalide.' }, 'configuration');
      if (options.dedupeKey && pending.has(options.dedupeKey)) throw new ApiError(409, { message: 'Cette demande est déjà en cours.' }, 'duplicate');
      const controller = new AbortController();
      let timedOut = false;
      const abort = () => controller.abort();
      if (options.signal?.aborted) abort();
      options.signal?.addEventListener('abort', abort, { once: true });
      const timer = setTimeout(() => { timedOut = true; controller.abort(); }, options.timeout ?? config.timeout);
      if (options.dedupeKey) pending.add(options.dedupeKey);
      try {
        const headers = new Headers(options.headers);
        headers.set('Accept', 'application/json');
        const multipart = typeof FormData !== 'undefined' && options.body instanceof FormData;
        if (multipart) headers.delete('Content-Type');
        else if (options.body) headers.set('Content-Type', 'application/json');
        const method = (options.method ?? 'GET').toUpperCase();
        if (!['GET','HEAD','OPTIONS'].includes(method) && typeof document !== 'undefined') {
          const cookie = document.cookie.split('; ').find(c => c.startsWith('XSRF-TOKEN='));
          if (cookie) { try { headers.set('X-XSRF-TOKEN', decodeURIComponent(cookie.slice(11))); } catch { throw new ApiError(419, { message: 'Cookie CSRF illisible. Réinitialisez la session.' }); } }
        }
        const response = await transport(`${options.scope === 'origin' ? config.origin : config.baseUrl}${path}`, { ...options, method, headers, credentials: 'include', signal: controller.signal, redirect: 'error' });
        if (!response.ok) {
          if (response.status === 401) listeners.forEach(listener => listener());
          throw httpError(response.status, await response.json().catch(() => null), response.headers.get('Retry-After') ?? undefined);
        }
        if (response.status === 204) return undefined as T;
        if (options.responseType === 'blob') return await response.blob() as T;
        if (!response.headers.get('content-type')?.includes('application/json')) throw new ApiError(502, { message: 'Réponse Laravel non JSON. Vérifiez l’adresse de l’API.' }, 'contract');
        try { return await response.json() as T; } catch { throw new ApiError(502, { message: 'Réponse Laravel illisible.' }, 'contract'); }
      } catch (error) {
        if (error instanceof ApiError) throw error;
        if (controller.signal.aborted) throw new ApiError(0, { message: timedOut ? 'Le service Laravel ne répond pas à temps. Réessayez.' : 'Demande annulée.' }, timedOut ? 'timeout' : 'cancelled');
        throw new ApiError(0, { message: 'Impossible de joindre Laravel. Vérifiez votre connexion puis réessayez.' }, 'network');
      } finally { clearTimeout(timer); options.signal?.removeEventListener('abort', abort); if (options.dedupeKey) pending.delete(options.dedupeKey); }
    },
  };
}
export const http = createHttpClient(environment);
export const apiRequest = <T>(path: string, options?: RequestOptions) => http.request<T>(path, options);
export const jsonBody = (value: unknown) => JSON.stringify(value);
