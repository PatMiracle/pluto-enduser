import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { LONG_TTL } from "./enum-api";

export type TicketType =
  | "ISSUE"
  | "IT_SUPPORT"
  | "CONSULTATION"
  | "ENVIRONMENTAL_HAZARD"
  | "APPLICATION_ISSUES"
  | "ADMIN_IT_SUPPORT";

export const enum IssueTypes {
  EnvironmentalHazard = 501,
  Others = 405,
  MissingPickupLocation = 404,
  StolenBrokenContainer = 403,
  MobileApplication = 402,
  MissedPickup = 401,
  ComplaintsRegulatorySupport = 306,
  NewLocationSetup = 305,
  BulkHazardousWasteRequests = 304,
  BillingServicePlans = 303,
  WasteSortingCompplianceRules = 302,
  CollectionScheduleMissedPickups = 301,
}

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
