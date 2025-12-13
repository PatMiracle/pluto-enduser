import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { Landmark, ServiceRequest } from "./service-requests-api";

// A single event record
export interface CalendarEvent {
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

interface Params {
  pageSize?: number;
  status?: number;
  from?: string;
  to?: string;
  eventType?: string;
}

export const useCalenderEvents = (params: Params) =>
  usePaginatedQuery<PaginatedResponse<CalendarEvent>>(
    "calendar-events",
    "user/calendar-events",
    params,
  );
