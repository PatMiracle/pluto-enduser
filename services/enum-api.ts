import { useApiQuery, usePaginatedQuery } from "@/hooks/useApiQuery";

export const LONG_TTL = 24 * 60 * 60 * 1000; // 24 hours
const SHORT_TTL = 5 * 60 * 1000; // 5 minutes

export interface State {
  stateId: number;
  stateName: string;
}

export const useStates = () =>
  useApiQuery<PaginatedResponse<State>>(
    "states",
    "/states",
    {},
    { staleTime: LONG_TTL },
  );

export const useTrackedStates = () =>
  usePaginatedQuery<PaginatedResponse<State>>(
    "tracked-states",
    "/states/tracked",
    {},
    { staleTime: LONG_TTL },
  );

export type LGA = {
  lgaId: number;
  lgaName: string;
  state: number;
};

interface LGAResponse {
  data: LGA[];
  pagination: Pagination;
}

export const useTrackedLGAs = (
  params: { stateId?: number },
  opts?: { enabled?: boolean },
) =>
  useApiQuery<LGAResponse>("tracked-lgas", "/lgas/tracked", params, {
    staleTime: LONG_TTL,
    ...opts,
  });

type Landmark = {
  postalCodeId: number;
  postalCode: string;
  landmarkName: string;
  lgaId: number;
  lgaName: string;
  stateId: number;
  stateName: string;
};

interface LandmarkResponse {
  data: Landmark[];
  pagination: Pagination;
}

export const useTrackedLandmarks = (
  params: {
    stateId?: number;
    lgaId?: number;
  },
  opts?: { enabled?: boolean },
) =>
  useApiQuery<LandmarkResponse>("postals-tracked", "/postals/tracked", params, {
    staleTime: LONG_TTL,
    ...opts,
  });

export const useLGAs = (
  params: { stateId?: number },
  opts?: { enabled?: boolean },
) =>
  useApiQuery<LGAResponse>("lgas", "/lgas", params, {
    staleTime: LONG_TTL,
    ...opts,
  });

export interface LocationType {
  subscriptionClassId: number;
  subscriptionName: string;
  subscriptionCode: string;
  subscriptionInfo: string;
  subscriptionAmount: number;
  subscriptionDiscountPercentage: number;
  locationTypeId: number;
  locationTypeName: string;
  landmarkId: number;
  landmark: {
    postalCodeId: number;
    postalCode: string;
    landmarkName: string;
    lgaId: number;
    lgaName: string;
    stateId: number;
    stateName: string;
  };
  lgaId: number;
  lga: {
    lgaId: number;
    lgaName: string;
    state: number;
  };
  subscriptionFeatures: [
    {
      subscriptionFeatureId: number;
      subscriptionFeatureTitle: string;
      subscriptionFeatureDescription: string;
    },
  ];
}

interface LocationTypeResponse {
  data: LocationType[];
  pagination: Pagination;
}

export const useLocationTypes = (
  params?: {
    stateId?: number;
    lGAId?: number;
    landmarkId?: number;
  },
  options?: { enabled: boolean },
) =>
  useApiQuery<LocationTypeResponse>(
    "location-types",
    "/user/pickup-subscription-plans",
    params,
    {
      staleTime: SHORT_TTL,
      ...options,
    },
  );

export interface AccountType {
  accountTypeId: number;
  accountTypeCode: string;
  accountTypeName: string;
  description: string;
}

export const useAccountTypes = () =>
  usePaginatedQuery<PaginatedResponse<AccountType>>(
    "account-types",
    "/account-types",
    {},
    {
      staleTime: LONG_TTL,
    },
  );

export interface ServiceRequestType {
  id: number;
  name: string;
  label: string;
}

interface ServiceRequestTypeResponse {
  data: ServiceRequestType[];
  pagination: Pagination;
}

export const useServiceRequestTypes = () =>
  useApiQuery<ServiceRequestTypeResponse>(
    "service-request-types",
    "/service-request-types",
    {},
    {
      staleTime: LONG_TTL,
    },
  );

export interface WasteType {
  wasteClassId: number;
  wasteClassCode: string;
  wasteClassName: string;
  wasteClassInfo: string;
}

interface WasteTypeResponse {
  data: WasteType[];
  pagination: Pagination;
}

export const useWasteTypes = () =>
  useApiQuery<WasteTypeResponse>(
    "waste-classes",
    "/waste-classes",
    {},
    {
      staleTime: LONG_TTL,
    },
  );
