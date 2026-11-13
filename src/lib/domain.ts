export type ModuleKey =
  "services" | "market" | "jobs" | "digital" | "delivery" | "classifieds" | "business" | "student";
export type Role =
  "client" | "prestataire" | "vendeur" | "recruteur" | "livreur" | "administrateur";
export interface Listing {
  id: string;
  module: ModuleKey;
  title: string;
  category: string;
  location: string;
  price: number;
  unit?: string;
  image?: string;
  seller: string;
  description: string;
  available: boolean;
  featured?: boolean;
  tags: string[];
  stock?: number;
  deadline?: string;
}
export interface CartLine {
  listing: Listing;
  quantity: number;
}
export interface DemoActivity {
  id: string;
  type: string;
  title: string;
  status: string;
  date: string;
  amount?: number;
}
export interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  role: Role;
}
export interface PaginatedResponse<T> {
  data: T[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  links: { next: string | null; prev: string | null };
}
export interface ApiErrorBody {
  message: string;
  errors?: Record<string, string[]>;
}
export const money = (amount: number) => `${new Intl.NumberFormat("fr-FR").format(amount)} BIF`;
