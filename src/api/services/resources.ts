import { http, jsonBody } from '../client';
import { idPath, queryString } from '../endpoints';
import type { ApiResponse, ListParams, Resource } from '@/types/api';
import type { PaginatedResponse } from '@/lib/domain';
/** Typed transport, with server validation and permissions mandatory. Endpoints are proposed, not verified. */
export function resourceService<T extends { id: string }, Input extends object = Partial<T>>(base: string) {
  return {
    list: (params: ListParams = {}, signal?: AbortSignal) => http.request<PaginatedResponse<T>>(`${base}${queryString(params)}`, { signal }),
    get: (id: string, signal?: AbortSignal) => http.request<ApiResponse<T>>(idPath(base, id), { signal }),
    create: (input: Input, key?: string) => http.request<ApiResponse<T>>(base, { method: 'POST', body: jsonBody(input), dedupeKey: key ?? `${base}:create` }),
    update: (id: string, input: Partial<Input>) => http.request<ApiResponse<T>>(idPath(base, id), { method: 'PATCH', body: jsonBody(input), dedupeKey: `${base}:${id}` }),
    remove: (id: string) => http.request<void>(idPath(base, id), { method: 'DELETE', dedupeKey: `${base}:${id}` }),
  };
}
export interface Category extends Resource { name: string }
