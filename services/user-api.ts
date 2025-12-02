import { useApiQuery } from "@/hooks/useApiQuery";

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

export const useUserQuery = () => useApiQuery<User>("user-info", "/users/me");
