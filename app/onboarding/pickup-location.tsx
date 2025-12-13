import { useAccountSetupContext } from "@/context/AccountSetupProvider";
import { useModal } from "@/context/ModalProvider";
import React from "react";
import { MdAddCircleOutline, MdOutlineInfo } from "react-icons/md";

export default function PickupLocations() {
  const { openModal } = useModal();
  const { data, setData, nextStep, prevStep } = useAccountSetupContext();

  return (
    <div className="mx-auto w-11/12 max-w-xl">
      <button
        className="border-green-normal bg-green-light flex min-h-[150px] w-full flex-col items-center justify-center gap-1.5 rounded-2xl border py-4 md:min-h-[200px]"
        onClick={() => openModal("pickup")}
        disabled={data.locations?.length == 4}
      >
        <MdAddCircleOutline className="text-green-normal lg:text-2xl" />
        <p className="text-xs lg:text-sm">Click to add a pickup location</p>
        <div className="text-white-darker flex items-center gap-1">
          <MdOutlineInfo size={14} />
          <p className="text-xs">Maximum: 4 Locations per account</p>
        </div>
      </button>
    </div>
  );
}
