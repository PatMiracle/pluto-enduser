import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { LONG_TTL } from "./enum-api";

export type TicketType =
  | "ISSUE"
  | "IT_SUPPORT"
  | "CONSULTATION"
  | "ENVIRONMENTAL_HAZARD"
  | "APPLICATION_ISSUES"
  | "ADMIN_IT_SUPPORT";

export interface IssueType {
  issueTypeId: number;
  ticketType: string;
  issueTypeName: string;
}

export const useIssueTypes = (p?: { ticketType?: TicketType }) =>
  usePaginatedQuery<PaginatedResponse<IssueType>>(
    "issue-types",
    "/issue-types",
    { ...p },
    { staleTime: LONG_TTL },
  );
