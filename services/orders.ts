import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { Payment } from "./payments";

export interface OpeningHour {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  timeZone: string;
}

export interface PickupStation {
  postalId: number;
  address: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  lgaId: number;
  openingHours: OpeningHour[];
  state: string;
  dateCreated: string; // ISO date string
  pickupStationId: number;
  lga: string;
  postalCode: string;
  previewImage: string;
  locationStatus: "INACTIVE" | "ACTIVE" | "OVERDUE" | "SUSPENDED";
}

export interface Checkout {
  checkoutId: number;
  totalPrice: number;
  adjustedTotalPrice: number;
  totalDiscount: number;
  deliveryMode: string; // e.g., "HOME_DELIVERY"
  deliveryDetailsId: number;
  pickupStationId: number;
  pickupStation: PickupStation;
  paymentMode: string; // e.g., "NGN"
  expiryDate: string; // ISO date string
  productId: number;
  paymentId: number;
  payment: Payment;
}

export interface OrderItem {
  cartItemId: number;
  quantity: number;
  originalPrice: number;
  productId: number;
  totalPrice: number;
  totalPoints: number;
  productName: string;
  productCode: string;
  imageURL: string;
  checkout: Checkout;
  orderId: number;
}

interface OrderResponse {
  data: OrderItem[];
}

export const useOrders = () =>
  usePaginatedQuery<OrderResponse>("orders", "/user/orders");
