"use client";

import { useAccountSetupContext } from "@/context/AccountSetupProvider";
import Board from "./board";
import StepProgressBar from "./step-progress";
import { useAccountTypes } from "@/services/enum-api";
import PersonalDetails from "./personal";
import BusinessDetails from "./business";
import GovernmentDetails from "./government";
import PickupLocations from "./pickup-location";
import Summary from "./summary";

export default function Onboarding() {
  const { currentStep, data } = useAccountSetupContext();

  const { data: rawAccountTypes } = useAccountTypes();

  const accountTypeCode = rawAccountTypes?.find(
    (e) => e.accountTypeId === data.accountType,
  )?.accountTypeCode;

  return (
    <>
      <StepProgressBar activeIndex={currentStep - 1} />
      {currentStep == 1 ? (
        <Board />
      ) : currentStep == 2 ? (
        <>
          {accountTypeCode == "personal" ? (
            <PersonalDetails />
          ) : accountTypeCode == "business" ? (
            <BusinessDetails />
          ) : (
            accountTypeCode == "government" && <GovernmentDetails />
          )}
        </>
      ) : currentStep == 3 ? (
        <PickupLocations />
      ) : (
        currentStep == 4 && <Summary />
      )}
    </>
  );
}
