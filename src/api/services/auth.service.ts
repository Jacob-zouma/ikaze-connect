import { z } from 'zod';
import { http, jsonBody } from '../client';
import { parseContract } from '../response';
import type { AuthUser, LoginInput, SignupInput, ResetPasswordInput } from '@/types/api';
const userSchema = z.object({ id: z.union([z.string(), z.number().int().safe()]).transform(String), name: z.string(), email: z.string().email(), phone: z.string(), location: z.string(), bio: z.string(), roles: z.array(z.enum(['client','prestataire','vendeur','recruteur','livreur','administrateur'])), email_verified_at: z.string().datetime({ offset: true }).nullable(), created_at: z.string().datetime({ offset: true }), updated_at: z.string().datetime({ offset: true }) });
export const authService = {
  csrf: () => http.request<void>('/sanctum/csrf-cookie', { scope: 'origin' }),
  async me(signal?: AbortSignal): Promise<AuthUser> { const response = await http.request<{ data: unknown }>('/me', { signal }); return parseContract(userSchema, response.data); },
  async login(input: LoginInput) { await authService.csrf(); await http.request<void>('/auth/login', { method: 'POST', body: jsonBody(input), dedupeKey: 'auth' }); return authService.me(); },
  async signup(input: SignupInput) { await authService.csrf(); await http.request<void>('/auth/register', { method: 'POST', body: jsonBody(input), dedupeKey: 'auth' }); return authService.me(); },
  async logout() { await http.request<void>('/auth/logout', { method: 'POST', dedupeKey: 'auth' }); },
  async forgotPassword(email: string) { await authService.csrf(); return http.request<{ message: string }>('/auth/forgot-password', { method: 'POST', body: jsonBody({ email }), dedupeKey: 'auth' }); },
  async resetPassword(input: ResetPasswordInput) { await authService.csrf(); return http.request<{ message: string }>('/auth/reset-password', { method: 'POST', body: jsonBody(input), dedupeKey: 'auth' }); },
  resendVerification: () => http.request<{ message: string }>('/auth/email/verification-notification', { method: 'POST', dedupeKey: 'verification' }),
  verifyEmail: (id: string, hash: string, expires: string, signature: string) => http.request<void>(`/auth/email/verify/${encodeURIComponent(id)}/${encodeURIComponent(hash)}?${new URLSearchParams({ expires, signature })}`),
};
