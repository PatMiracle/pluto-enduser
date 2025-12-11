import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { ClientLocation } from "./client-locations";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";

type PickupSubscription = {
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  pickupLocation: ClientLocation;
  subscriptionRenewalDate: string;
  prevSubscription?: PickupSubscription | null;
  subscriptionCancellationDate: string;
  subscriptionClassId: number;
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
  staleTime?: number;
}

export const usePayments = (p?: Params, o?: Options) =>
  usePaginatedQuery<PaymentResponse>("payments", "/user/payments", p, o);

export const useMakePayment = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const res = await api.post(`/user/payments/${id}/pay`);
        window.location.href = res.data.paymentLink;
        return res.data;
      } catch (error) {
        defaultErrorHandler(error);
        throw error;
      }
    },
  });
};
