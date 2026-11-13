import type { ModuleKey } from '@/lib/domain';
export const moduleEndpoints: Record<ModuleKey, string> = { services: '/services', market: '/products', jobs: '/jobs', digital: '/digital/services', delivery: '/deliveries', classifieds: '/classifieds', business: '/businesses', student: '/students/opportunities' };
export const idPath = (base: string, id: string) => `${base}/${encodeURIComponent(id)}`;
export function queryString(params: object = {}): string { const query = new URLSearchParams(); for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== '') query.set(key, String(value)); return query.size ? `?${query}` : ''; }
