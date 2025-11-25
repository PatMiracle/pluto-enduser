import { useApiQuery } from "@/hooks/useApiQuery";
import axios from "axios";

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

// get user from server
export const getUser = async () => {
  const res = await axios.get<User>("/api/user");
  return res.data;
};

export const useUserQuery = () => useApiQuery<User>("user-info", "/users/me");
