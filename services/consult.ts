import { useApiQuery } from "@/hooks/useApiQuery";
import { TicketResponse } from "./ticket";

interface Params {
  pageSize?: number;
}

export const useConsultation = (p: Params) =>
  useApiQuery<TicketResponse>("consultation", "/user/consultations", p);
