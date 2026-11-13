import type { ApiErrorBody, PaginatedResponse, Listing, ModuleKey, Profile } from "../domain";
export class ApiError extends Error {
  constructor(
    public status: number,
    public body: ApiErrorBody,
  ) {
    super(body.message);
    this.name = "ApiError";
  }
}
const baseUrl = import.meta.env["VITE_API_BASE_URL"]?.replace(/\/$/, "");
export const apiConfigured = Boolean(baseUrl);
let bearerToken: string | undefined;
// Token remains in memory. Decide cookie/Sanctum or token transport with the target API before activation.
export const setApiToken = (token?: string) => {
  bearerToken = token;
};
export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!baseUrl) throw new ApiError(503, { message: "L’API Laravel n’est pas encore connectée." });
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !(options.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  if (bearerToken) headers.set("Authorization", `Bearer ${bearerToken}`);
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
  if (response.status === 204) return undefined as T;
  const body = await response.json().catch(() => ({ message: "Réponse du serveur illisible." }));
  if (!response.ok) throw new ApiError(response.status, body);
  return body as T;
}
export const laravelApi = {
  listings: (module: ModuleKey, params: URLSearchParams = new URLSearchParams()) =>
    apiRequest<PaginatedResponse<Listing>>(`/${module}?${params}`),
  listing: (module: ModuleKey, id: string) =>
    apiRequest<{ data: Listing }>(`/${module}/${encodeURIComponent(id)}`),
  profile: () => apiRequest<{ data: Profile }>("/me"),
  updateProfile: (profile: Partial<Profile>) =>
    apiRequest<{ data: Profile }>("/me", { method: "PATCH", body: JSON.stringify(profile) }),
  createRequest: (module: ModuleKey, data: Record<string, unknown>) =>
    apiRequest<{ data: { id: string; status: string } }>(`/${module}/requests`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  upload: (file: File) => {
    const data = new FormData();
    data.append("file", file);
    return apiRequest<{ data: { url: string } }>("/uploads", { method: "POST", body: data });
  },
};
