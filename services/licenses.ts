import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { LONG_TTL } from "./enum-api";

// ---------- Enums ----------
export type LicenseType =
  | "SUBSCRIPTION_RENEWAL"
  | "WASTE_STORAGE_AND_TOOLS_REPLACEMENT"
  | "END_USER_LICENSE_AGREEMENT"
  | "PAYMENT_TERMS_AND_CONDITIONS"
  | "TERMS_AND_CONDITIONS"
  | "PRIVACY_POLICY";

export type LicenseScope = "CLIENTS" | "ADMINS" | "PUBLIC";

interface LicenseResponse {
  data: License[];
  pagination: Pagination;
}

export interface License {
  licenseId: number;
  title: string;
  content: string;
  validTill: string;
  licenseType: LicenseType;
  scope: LicenseScope;
  stateId?: number;
}

interface Params {
  stateId?: number;
}

export const useLicenses = (p?: Params) =>
  usePaginatedQuery<LicenseResponse>(
    "licenses",
    "/licenses",
    { ...p, scope: "CLIENTS" },
    {
      staleTime: LONG_TTL,
    },
  );
