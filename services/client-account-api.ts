import { usePaginatedQuery } from "@/hooks/useApiQuery";
import api from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

interface UpdateClient extends Partial<ClientAccount> {
  clientAccountId: number;
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ clientAccountId, ...data }: UpdateClient) => {
      const res = await api.patch(
        `/user/client-accounts/${clientAccountId}`,
        data,
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-account"],
      });
    },
  });
};

export interface OrgMinistry {
  dateCreated: string;
  lastModified: string;
  orgMinistryId: number;
  orgMinistryName: string;
}

export interface OrgAgency extends OrgMinistry {
  orgAgencyId: number;
  orgAgencyName: string;
}

export const useOrgMinistries = () =>
  usePaginatedQuery<PaginatedResponse<OrgMinistry>>(
    "org-ministries",
    "/org-ministries",
  );

export const useOrgAgencies = () =>
  usePaginatedQuery<PaginatedResponse<OrgAgency>>(
    "org-agencies",
    "/org-agencies",
  );
