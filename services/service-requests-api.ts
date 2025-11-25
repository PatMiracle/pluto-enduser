import { useApiQuery } from "@/hooks/useApiQuery";

interface Landmark {
  postalCodeId: number;
  postalCode: string;
  landmarkName: string;
  lgaId: number;
  lgaName: string;
  stateId: number;
  stateName: string;
}

interface ServiceRequest {
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
    | "CONFIRMED"
    | "ASSIGNED"
    | "ONGOING"
    | "COMPLETED"
    | "CANCELLED"
    | "REJECTED"
    | "CLOSED"
    | string;
  paymentId: number;
  serviceRequestId: number;
  landmark: Landmark;
}

// Pagination metadata
interface Pagination {
  pages: number[];
  currentPage: number;
  totalPages: string;
  hasPrev: boolean;
  hasNext: boolean;
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
}
export const useServiceRequests = (p: Params) =>
  useApiQuery<ServiceRequestsResponse>(
    "service-requests",
    "/user/service-requests",
    p,
  );
