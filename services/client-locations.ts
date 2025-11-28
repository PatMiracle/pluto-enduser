import { useApiQuery } from "@/hooks/useApiQuery";

interface Client {
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

export const useClientLocations = () =>
  useApiQuery<ClientLocationResponse>(
    "client-locations",
    "/user/client-locations",
  );
