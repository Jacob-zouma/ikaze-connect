import { isDemo } from '@/config/environment';
import { mockAdapter } from '@/mocks/mock-adapter';
import { http } from '../client';
import { normalizeListing, normalizePage } from '../response';
import { moduleEndpoints, queryString, idPath } from '../endpoints';
import type { ModuleKey } from '@/lib/domain';
import type { ListParams } from '@/types/api';
export const catalogService = {
  list: async (module: ModuleKey, params: ListParams = {}, signal?: AbortSignal) => isDemo ? mockAdapter.list(module, params) : normalizePage(await http.request<unknown>(`${moduleEndpoints[module]}${queryString(params)}`, { signal }), normalizeListing),
  detail: async (id: string, signal?: AbortSignal) => { if (isDemo) return mockAdapter.detail(id); const response = await http.request<{ data: unknown }>(idPath('/listings', id), { signal }); return normalizeListing(response.data); },
  search: async (params: ListParams = {}, signal?: AbortSignal) => isDemo ? mockAdapter.search(params) : normalizePage(await http.request<unknown>(`/search${queryString(params)}`, { signal }), normalizeListing),
};
