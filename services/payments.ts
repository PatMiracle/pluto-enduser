import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { ClientLocation } from "./client-locations";

type PickupSubscription = {
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  pickupLocation: ClientLocation;
  subscriptionRenewalDate: string;
  prevSubscription?: PickupSubscription | null;
  subscriptionCancellationDate: string;
  subscriptionClassId: 0;
};

export type Payment = {
  paymentId: number;
  paymentAmount: number;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentLink: string;
  transactionID: string;
  paymentInfo: string;
  paymentType: string;
  currency: string;
  entryScanID: string;
  pickupSubscription: PickupSubscription;
};

interface PaymentResponse {
  data: Payment[];
  pagination: Pagination;
}

interface Params {
  pageSize?: number;
  pickupLocation?: number;
}

interface Options {
  enabled?: boolean;
  ttl?: number;
}

export const usePayments = (p?: Params, o?: Options) =>
  usePaginatedQuery<PaymentResponse>("payments", "/user/payments", p, o);
