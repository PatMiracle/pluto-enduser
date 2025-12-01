import { useApiQuery } from "@/hooks/useApiQuery";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Landmark {
  postalCodeId: number;
  postalCode: string;
  landmarkName: string;
  lgaId: number;
  lgaName: string;
  stateId: number;
  stateName: string;
}

export interface ServiceRequest {
  dateCreated: string; // ISO date string
  lastModified: string; // ISO date string
  clientId: string; // UUID
  serviceRequestType: string;
  wasteType: string;
  contactNumber: string;
  contactName: string;
  postalId: number;
  startTime: string; // ISO date string
  startDate: string; // YYYY-MM-DD
  description: string;
  contactEmail: string;
  clientRating: number;
  estimatedCost: number;
  clientAddress: string;
  paymentMethod: "MANUAL" | "CARD" | "ONLINE" | string;
  pickupAddress: string;
  orderStatus:
    | "NEW"
    | "PENDING"
    | "APPROVED"
    | "COMPLETED"
    | "CANCELLED"
    | "OVER_DUE"
    | "CLIENT_CANCELLED";
  paymentId: number;
  serviceRequestId: number;
  landmark: Landmark;
}

// Full API response
export interface ServiceRequestsResponse {
  start: number;
  count: number;
  total: string;
  done: boolean;
  data: ServiceRequest[];
  pagination: Pagination;
}

interface Params {
  pageSize?: number;
  status?: ServiceRequest["orderStatus"];
  search?: string;
}
export const useServiceRequests = (p: Params) =>
  useApiQuery<ServiceRequestsResponse>(
    "service-requests",
    "/user/service-requests",
    p,
  );

export const useCancelRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      api
        .post(`/user/service-requests/${id}/cancel`)
        .then((response) => response.data)
        .catch(defaultErrorHandler),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-requests"],
      });
    },
  });
};
