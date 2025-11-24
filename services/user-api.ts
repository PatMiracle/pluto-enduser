import api from "./api";
import { useQuery } from "@tanstack/react-query";

interface User {
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

const getUser = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const useUserQuery = () =>
  useQuery({ queryKey: ["user"], queryFn: getUser, staleTime: 5 * 60 * 1000 });
