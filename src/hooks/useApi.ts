import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/api/errors';
import { isDemo } from '@/config/environment';
import { catalogService } from '@/api/services/catalog.service';
import { mockAdapter } from '@/mocks/mock-adapter';
import type { ModuleKey } from '@/lib/domain';
import type { ListParams } from '@/types/api';
export const apiRetry = (count: number, error: unknown) => count < 1 && error instanceof ApiError && (error.kind === 'network' || error.status >= 500) && error.kind !== 'contract';
export function useCatalog(module: ModuleKey, params: ListParams = {}) { return useQuery({ queryKey: ['catalog', module, params], queryFn: ({ signal }) => catalogService.list(module, params, signal), initialData: isDemo ? () => mockAdapter.list(module, params) : undefined, retry: apiRetry }); }
export function useSearch(params: ListParams) { return useQuery({ queryKey: ['search', params], queryFn: ({ signal }) => catalogService.search(params, signal), initialData: isDemo ? () => mockAdapter.search(params) : undefined, retry: apiRetry }); }
export function useDetail(id: string) { return useQuery({ queryKey: ['detail', id], queryFn: ({ signal }) => catalogService.detail(id, signal), initialData: isDemo ? () => { try { return mockAdapter.detail(id); } catch { return undefined; } } : undefined, retry: apiRetry }); }
export function useApiMutation<Input, Output>(action: (input: Input) => Promise<Output>, invalidate: string[] = []) { const client = useQueryClient(); return useMutation({ mutationFn: action, retry: false, onSuccess: () => { invalidate.forEach(key => void client.invalidateQueries({ queryKey: [key] })); } }); }
