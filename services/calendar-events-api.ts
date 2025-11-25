import { useApiQuery } from "@/hooks/useApiQuery";

// Landmark info
interface Landmark {
  postalCodeId: number;
  postalCode: string;
  landmarkName: string;
  lgaId: number;
  lgaName: string;
  stateId: number;
  stateName: string;
}

// Nested service request inside an event
interface ServiceRequest {
  dateCreated: string;
  lastModified: string;
  clientId: string;
  serviceRequestType: string;
  wasteType: string;
  contactNumber: string;
  contactName: string;
  postalId: number;
  startTime: string;
  startDate: string;
  description: string;
  contactEmail: string;
  clientRating: number;
  estimatedCost: number;
  clientAddress: string;
  paymentMethod: string;
  pickupAddress: string;
  orderStatus: string;
  paymentId: number;
  serviceRequestId: number;
  landmark: Landmark;
}

// A single event record
interface Event {
  dateCreated: string;
  lastModified: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  time: string;
  status: "NEW" | "ONGOING" | "COMPLETED" | "CANCELLED" | string;
  eventId: string;
  location: string;
  eventType: string;
  request: ServiceRequest;
  landmark: Landmark;
  recurrence: string;
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
interface EventsResponse {
  start: number;
  count: number;
  total: string;
  done: boolean;
  data: Event[];
  pagination: Pagination;
}

interface Params {
  pageSize?: number;
  status?: number;
  from?: string;
  to?: string;
  eventType?: string;
}

export const useCalenderEvents = (params: Params) =>
  useApiQuery<EventsResponse>(
    "calendar-events",
    "user/calendar-events",
    params,
  );
