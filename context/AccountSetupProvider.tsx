"use client";

import { ClientAccount } from "@/services/client-account-api";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

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

export default function AccountSetupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Stable initial value
  const initialData: AccountSetupContextData = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      country: "Nigeria",
      stateWasteManagementBoardId: Number(process.env.NEXT_PUBLIC_STATE_ID),
      locations: [],
    }),
    [],
  );

  const [data, setData] = useState<AccountSetupContextData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleUpdateData = (v: AccountSetupContextData) => {
    setData((prev) => ({ ...v, ...prev }));
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
