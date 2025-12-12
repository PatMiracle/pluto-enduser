import { useApiQuery } from "@/hooks/useApiQuery";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LONG_TTL } from "./enum-api";

export interface User {
  accountType: "personal" | "business" | "government";
  stateWasteManagementBoardId: number | null;
  city: string;
  clientCode: string;
  email: string;
  firstName: string;
  houseNumber: string;
  id: string;
  isStaff: boolean;
  lastName: string;
  lga: number | null;
  needsAccountSetup: boolean;
  numLocations: number;
  phoneNumber: string;
  photoURL: string | null;
  qrCode: string | null;
  residentCountry: string | null;
  residentState: number | null;
  status: "ACTIVE" | "INACTIVE";
  streetAddress: string;
}

export const useUserQuery = () =>
  useApiQuery<User>("user-info", "/users/me", {}, { staleTime: LONG_TTL });

type UpdateUser = Partial<User> & {
  profilePhoto?: File;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ...data }: UpdateUser) => {
      const res = await api.patch("/users/me", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-info"],
      });
    },
  });
};
