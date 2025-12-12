import { useApiQuery, usePaginatedQuery } from "@/hooks/useApiQuery";

export interface ClientAccount {
  clientAccountId: number;
  clientId: string;
  clientAccountCode: string;
  streetAddress: string;
  numLocations: number;
  accountType: number;
  accountTypeName: string;
  orgName: string;
  orgWebsite: string;
  orgPhoneNo: string;
  orgEmail: string;
  orgStreetNo: string;
  orgMinistryId: number;
  orgMinistry: string;
  orgAgencyId: number;
  orgAgency: string;
  orgJurisdiction: "FEDERAL" | "STATE" | "LOCAL" | string;
  orgIdentificationNo: string;
  orgSuitNo: string;
  orgCity: string;
  orgLGA: number;
  orgState: number;
  orgCountry: string;
  orgContactFirstName: string;
  stateWasteManagementBoardId: number;
  residentStateId: number;
  residentLGAId: number;
  orgContactLastName: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export const useClientAccount = () =>
  usePaginatedQuery<PaginatedResponse<ClientAccount>>(
    "client-account",
    "/user/client-accounts",
  );
