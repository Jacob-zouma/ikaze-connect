import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/api/services/auth.service';
import { http } from '@/api/client';
import { ApiError } from '@/api/errors';
import { environment, isDemo } from '@/config/environment';
import type { AuthUser } from '@/types/api';
import type { Role } from '@/lib/domain';
import { ApiState } from './api-state';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
interface AuthState { user: AuthUser | null; loading: boolean; error: unknown; refresh: () => void; accept: (user: AuthUser) => void; logout: () => Promise<void> }
const AuthContext = createContext<AuthState | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const client = useQueryClient();
  const session = useQuery({ queryKey: ['session'], queryFn: async ({ signal }) => { try { return await authService.me(signal); } catch (error) { if (error instanceof ApiError && error.status === 401) return null; throw error; } }, enabled: !isDemo && !environment.error && typeof window !== 'undefined', retry: false, staleTime: 60000 });
  useEffect(() => http.onUnauthorized(() => { client.clear(); client.setQueryData(['session'], null); }), [client]);
  return <AuthContext.Provider value={{ user: session.data ?? null, loading: !isDemo && session.isPending, error: session.error, refresh: () => { void session.refetch(); }, accept: user => { client.clear(); client.setQueryData(['session'], user); }, logout: async () => { await authService.logout(); client.clear(); client.setQueryData(['session'], null); } }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('AuthProvider required'); return value; }
export function PrivateGate({ children, role }: { children: ReactNode; role?: Role }) {
  const auth = useAuth();
  if (isDemo) return children;
  if (auth.error || auth.loading) return <div className="container section"><ApiState loading={auth.loading} error={auth.error} retry={auth.refresh} /></div>;
  if (!auth.user) return <div className="container section"><h1>Connexion nécessaire</h1><Button asChild><Link to="/connexion">Se connecter</Link></Button></div>;
  if (role && !auth.user.roles.includes(role)) return <div className="container section"><ApiState error={new ApiError(403, { message: 'Cet espace n’est pas autorisé pour votre compte.' })} /></div>;
  return children;
}
