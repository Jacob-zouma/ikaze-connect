import type { ModuleKey, Role } from '@/lib/domain';
export type { PaginatedResponse, ApiErrorBody } from '@/lib/domain';
export interface ApiResponse<T> { data: T }
export type ID = string;
/** Whole BIF as a canonical decimal string, never floating-point money. */
export type BifAmount = string;
export interface Resource { id: ID; created_at: string; updated_at: string }
export interface UserProfile { name: string; email: string; phone: string; location: string; bio: string }
export interface AuthUser extends Resource, UserProfile { roles: Role[]; email_verified_at: string | null }
export interface LoginInput { email: string; password: string }
export interface SignupInput extends LoginInput { name: string; password_confirmation: string; role: Exclude<Role, 'administrateur'> }
export interface ResetPasswordInput { token: string; email: string; password: string; password_confirmation: string }
export interface ListingDto extends Resource { module: ModuleKey; title: string; category: string; location: string; price_bif: BifAmount; unit?: string; image_url?: string | null; seller: { id: ID; name: string }; description: string; available: boolean; featured?: boolean; tags: string[]; stock?: number; deadline?: string }
export interface ListingInput { title: string; category: string; location: string; price_bif: BifAmount; description: string; available: boolean; stock?: number; deadline?: string; file_ids?: ID[] }
export interface Provider extends Resource { user_id: ID; name: string; skills: string[]; location: string }
export interface Service extends ListingDto { module: 'services'; provider_id: ID }
export interface Product extends ListingDto { module: 'market'; store_id: ID; stock: number }
export interface Store extends Resource { name: string; owner_id: ID; description: string }
export interface JobOffer extends ListingDto { module: 'jobs'; recruiter_id: ID; contract_type: string }
export interface DigitalService extends ListingDto { module: 'digital'; revisions_included: number }
export interface ClassifiedAd extends ListingDto { module: 'classifieds'; expires_at: string | null }
export interface Business extends ListingDto { module: 'business'; owner_id: ID }
export interface Student extends ListingDto { module: 'student'; skills: string[] }
export type RequestStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';
export interface RequestResource extends Resource { status: RequestStatus; title: string; amount_bif?: BifAmount }
export interface Booking extends RequestResource { listing_id: ID; scheduled_at: string; user_id: ID }
export interface BookingInput { listing_id: ID; scheduled_at: string; message: string }
export interface Application extends RequestResource { job_id: ID; cv_file_id: ID; cover_letter: string }
export interface ApplicationInput { job_id: ID; cv_file_id: ID; cover_letter: string }
export interface CartItem { id: ID; product: Product; quantity: number }
export interface Cart { items: CartItem[]; subtotal_bif: BifAmount; currency: 'BIF' }
export interface AddressInput { name: string; phone: string; address: string; city: string; instructions?: string }
export interface Order extends RequestResource { total_bif: BifAmount; currency: 'BIF'; payment_status: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded' }
export interface OrderInput { address: AddressInput; cart_id: ID }
export interface Payment extends Resource { order_id: ID; amount_bif: BifAmount; currency: 'BIF'; status: Order['payment_status']; checkout_url?: string }
export interface Delivery extends RequestResource { pickup_address: string; destination_address: string; recipient_name: string; recipient_phone: string; driver_id: ID | null }
export interface DeliveryInput { pickup_address: string; destination_address: string; recipient_name: string; recipient_phone: string; package_type: string; weight_kg: string; requested_date: string; mode: string; description: string; prohibited_goods_confirmed: boolean }
export interface Conversation extends Resource { participants: AuthUser[]; subject: string }
export interface Message extends Resource { conversation_id: ID; sender_id: ID; body: string }
export interface Notification extends Resource { title: string; body: string; read_at: string | null }
export interface Review extends Resource { listing_id: ID; rating: number; body: string; author_id: ID }
export interface Dispute extends RequestResource { order_id: ID; reason: string }
export interface Subscription extends Resource { plan_id: ID; status: 'active' | 'expired' | 'cancelled'; ends_at: string }
export interface Upload extends Resource { url: string; mime_type: string; size: number }
export interface ListParams { q?: string; category?: string; location?: string; max_price?: string; available?: boolean; page?: number; sort?: string; per_page?: number }
