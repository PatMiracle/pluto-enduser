"use client";

import { ClientAccount } from "@/services/client-account-api";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface Location {
  lga: number;
  postalId: number;
  address: string;
  locationType: number;
  numFlats: number;
  population: number;
  contactFirstName: string;
  contactLastName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  previewImage: File;
  landmarkName: string;
  state: number;
}

export type AccountSetupContextData = Partial<ClientAccount> & {
  locations?: Location[];
};

export const AccountSetupContext = createContext<{
  data: AccountSetupContextData;
  setData: (v: AccountSetupContextData) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}>(null!);

export const useAccountSetupContext = () => {
  const ctx = useContext(AccountSetupContext);
  if (!ctx) {
    throw new Error(
      "useAccountSetupContext must be used inside AccountSetupContext.Provider",
    );
  }
  return ctx;
};

const STORAGE_KEY = "account-setup-form";

const initialData: AccountSetupContextData = {
  firstName: "",
  lastName: "",
  orgCountry: "Nigeria",
  stateWasteManagementBoardId: Number(process.env.NEXT_PUBLIC_STATE_ID),
  locations: [],
};

export default function AccountSetupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  const [data, setData] = useState<AccountSetupContextData>(() => {
    if (typeof window === "undefined") return initialData;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData;
  });

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (mounted && data.accountType) {
      setData({ ...initialData, accountType: data.accountType });
    } else setMounted(true);
  }, [data.accountType]);

  const handleUpdateData = (v: AccountSetupContextData) => {
    setData((prev) => ({ ...prev, ...v }));
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const value = useMemo(() => ({ data, setData: handleUpdateData }), [data]);

  return (
    <AccountSetupContext.Provider
      value={{ currentStep, nextStep, prevStep, ...value }}
    >
      {children}
    </AccountSetupContext.Provider>
  );
}
