import { useApiQuery } from "@/hooks/useApiQuery";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Client {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
  id: string;
  email: string;
  isStaff: boolean;
  photoURL: string;
  needsAccountSetup: boolean;
  streetAddress: string;
  houseNumber: string;
  city: string;
  lga: number;
  residentState: number;
  stateWasteManagementBoardId: number;
  stateWasteManagementId: number;
  residentCountry: string;
  numLocations: number;
  clientCode: string;
  accountType: string;
}

export interface ClientLocation {
  postalId: number;
  address: string;
  clientId: string;
  locationTypeId: number;
  locationTypeName: string;
  population: number;
  buildingType: string;
  contactFirstName: string;
  contactLastName: string;
  numFlats: number;
  contactPhoneNumber: string;
  contactEmail: string;
  lga: string;
  landmarkName: string;
  postalCode: string;
  state: string;
  client: Client;
  dateCreated: string;
  clientLocationId: number;
  previewImage: string;
  clientAccountType: string;
  locationStatus: "INACTIVE" | "ACTIVE" | "OVERDUE" | "SUSPENDED";
}

interface ClientLocationResponse {
  data: ClientLocation[];
  pagination: Pagination;
}

export const useClientLocations = (
  p?: { clientLocationId?: number },
  opts?: { enabled?: boolean },
) =>
  useApiQuery<ClientLocationResponse>(
    "client-locations",
    "/user/client-locations",
    { ...p },
    { ...opts },
  );

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await api.post(`/user/client-locations`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-locations"],
      });
    },
  });
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Record<string, any>) => {
      const res = await api.patch(`/user/client-locations/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-locations"],
      });
    },
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/user/client-locations/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-locations"],
      });
    },
  });
};
