import { filterListings, getListing, listings } from '@/lib/demo-data';
import type { Listing, ModuleKey, PaginatedResponse } from '@/lib/domain';
import type { ListParams } from '@/types/api';
import { ApiError } from '@/api/errors';
export function mockPage(items: Listing[], params: ListParams = {}): PaginatedResponse<Listing> {
  const per_page = params.per_page ?? 12; const last_page = Math.max(1, Math.ceil(items.length / per_page)); const current_page = params.page ?? 1;
  return { data: items.slice((current_page - 1) * per_page, current_page * per_page), meta: { current_page, last_page, per_page, total: items.length }, links: { next: current_page < last_page ? `?page=${current_page + 1}` : null, prev: current_page > 1 ? `?page=${current_page - 1}` : null } };
}
export const mockAdapter = {
  list(module: ModuleKey, params: ListParams = {}) { let data = filterListings(module, params.q, params.category, params.location, params.max_price ? Number(params.max_price) : Infinity, params.available); if (params.sort === 'price') data = [...data].sort((a,b) => a.price-b.price); if (params.sort === 'name') data = [...data].sort((a,b) => a.title.localeCompare(b.title)); return mockPage(data, params); },
  detail(id: string) { const item = getListing(id); if (!item) throw new ApiError(404, { message: 'Annonce introuvable.' }); return item; },
  search(params: ListParams) { return mockPage(listings.filter(l => `${l.title} ${l.category} ${l.module}`.toLocaleLowerCase('fr').includes((params.q ?? '').toLocaleLowerCase('fr')) && (!params.location || l.location === params.location)), params); },
};
