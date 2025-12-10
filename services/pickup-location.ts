import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { OpeningHour } from "./orders";

type PickupLocation = {
  state: string;
  dateCreated: string;
  pickupStationId: number;
  lga: string;
  postalCode: string;
  previewImage: string | null;
  locationStatus: "ACTIVE" | "INACTIVE";
  postalId: number;
  address: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  lgaId: number;
  openingHours: OpeningHour[];
};

interface Response {
  data: PickupLocation[];
}

interface Params {
  stateId?: number;
  lgaId?: number;
}

export const usePickupLocations = (p?: Params, o?: { enabled?: boolean }) =>
  usePaginatedQuery<Response>(
    "pickup-locations",
    "/pickup-stations",
    { ...p },
    { ...o },
  );
