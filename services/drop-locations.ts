import { useApiQuery } from "@/hooks/useApiQuery";

type OpeningHour = {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  timeZone: string;
};

type Landmark = {
  postalCodeId: number;
  postalCode: string;
  landmarkName: string;
  lgaId: number;
  lgaName: string;
  stateId: number;
  stateName: string;
};

type Area = {
  lgaId: number;
  lgaName: string;
  state: number;
};

export type DropLocation = {
  collectionTypeName: string;
  dateCreated: string;
  lastModified: string;
  dropOffName: string;
  dropOffLandmark: number;
  dropOffAreaId: number;
  dropOffPostal: number;
  dropOffState: number;
  collectionType: number;
  dropOffStreetAddress: string;
  dropOffSuiteNumber: string;
  dropOffCity: string;
  dropOffCountry: string;
  openingHours: OpeningHour[];
  landmark: Landmark;
  area: Area;
  dropOffContactName: string;
  dropLocationStatus: string;
  dropOffContactEmail: string;
  dropOffContactPhone: string;
  dropLocationId: number;
};

interface DropLocationResponse {
  data: DropLocation[];
  pagination: Pagination;
}

interface Params {
  stateId?: number;
  lgaId?: number;
  pageSize?: number;
}

export const useDropLocations = (params: Params, enabled: boolean) =>
  useApiQuery<DropLocationResponse>(
    "drop-locations",
    "/drop-locations",
    params,
    { enabled },
  );
