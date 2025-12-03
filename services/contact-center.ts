import { usePaginatedQuery } from "@/hooks/useApiQuery";

interface OpeningHour {
  dayOfWeek: string; // e.g. "WEEKDAY" | "SAT" | "SUN"
  openingTime: string; // format: "HH:mm:ss"
  closingTime: string; // format: "HH:mm:ss"
  timeZone: string; // e.g. "Etc/GMT+1"
}

export interface ContactCenterDetails {
  contactEmail: string;
  contactName: string;
  contactPhoneNumber: string | null;
  state: string;
  lga: string;
  lgaId: number;
  stateId: number;
  openingHours: OpeningHour[];
}

interface ContactResponse {
  data: ContactCenterDetails[];
  pagination: Pagination;
}

export const useContactCenter = (p: { stateId?: number; pageSize?: number }) =>
  usePaginatedQuery<ContactResponse>("contact-details", "/contact-details", p);
