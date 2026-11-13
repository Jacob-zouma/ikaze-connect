import { z } from 'zod';
import type { Listing, PaginatedResponse } from '@/lib/domain';
import { ApiError } from './errors';
export const bifSchema = z.string().regex(/^(0|[1-9]\d*)$/).refine(v => BigInt(v) <= BigInt(Number.MAX_SAFE_INTEGER), 'Montant hors limite exacte du navigateur');
export const listingSchema = z.object({ id: z.union([z.string().min(1), z.number().int().nonnegative().safe()]).transform(String), module: z.enum(['services','market','jobs','digital','delivery','classifieds','business','student']), title: z.string(), category: z.string(), location: z.string(), price_bif: bifSchema, unit: z.string().optional(), image_url: z.string().url().nullable().optional(), seller: z.object({ id: z.union([z.string(), z.number().int().safe()]).transform(String), name: z.string() }), description: z.string(), available: z.boolean(), featured: z.boolean().optional(), tags: z.array(z.string()), stock: z.number().int().nonnegative().optional(), deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional() });
export function parseContract<S extends z.ZodTypeAny>(schema: S, value: unknown): z.output<S> {
  const result = schema.safeParse(value);
  if (!result.success) throw new ApiError(502, { message: 'La réponse Laravel ne respecte pas le contrat attendu. Aucune donnée fictive n’a été substituée.' }, 'contract');
  return result.data;
}
export function normalizeListing(value: unknown): Listing {
  const dto = parseContract(listingSchema, value);
  if (dto.image_url && !/^https?:\/\//.test(dto.image_url)) throw new ApiError(502, { message: 'Adresse du média invalide.' }, 'contract');
  return { id: dto.id, module: dto.module, title: dto.title, category: dto.category, location: dto.location, price: Number(dto.price_bif), seller: dto.seller.name, description: dto.description, available: dto.available, tags: dto.tags, ...(dto.unit ? { unit: dto.unit } : {}), ...(dto.image_url ? { image: dto.image_url } : {}), ...(dto.stock === undefined ? {} : { stock: dto.stock }), ...(dto.deadline ? { deadline: dto.deadline } : {}), ...(dto.featured === undefined ? {} : { featured: dto.featured }) };
}
const paginationSchema = z.object({ data: z.array(z.unknown()), meta: z.object({ current_page: z.number().int().positive(), last_page: z.number().int().positive(), per_page: z.number().int().positive(), total: z.number().int().nonnegative() }), links: z.object({ next: z.string().nullable(), prev: z.string().nullable() }) });
export function normalizePage<T>(value: unknown, normalize: (item: unknown) => T): PaginatedResponse<T> { const page = parseContract(paginationSchema, value); return { ...page, data: page.data.map(normalize) }; }
export const requestTransitions = { pending: ['accepted','rejected','cancelled'], accepted: ['in_progress','cancelled'], in_progress: ['completed','cancelled'], completed: [], rejected: [], cancelled: [] } as const;
export function canTransition(from: keyof typeof requestTransitions, to: string): boolean { return (requestTransitions[from] as readonly string[]).includes(to); }
export function sumBif(lines: { amount: string; quantity: number }[]): string { return lines.reduce((total, line) => { parseContract(bifSchema, line.amount); if (!Number.isSafeInteger(line.quantity) || line.quantity < 0) throw new ApiError(422, { message: 'Quantité invalide.' }); return total + BigInt(line.amount) * BigInt(line.quantity); }, 0n).toString(); }
