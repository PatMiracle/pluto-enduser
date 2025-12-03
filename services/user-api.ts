import { useApiQuery } from "@/hooks/useApiQuery";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LONG_TTL } from "./enum-api";

export interface User {
  accountType: "personal" | "business" | "government";
  //   profilePhoto:  | null;
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
  profilePhoto?: any;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ...data }: UpdateUser) =>
      api
        .patch("/users/me", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => response.data)
        .catch(defaultErrorHandler),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-info"],
      });
    },
  });
};
