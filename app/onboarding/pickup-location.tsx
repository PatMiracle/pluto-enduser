import { useAccountSetupContext } from "@/context/AccountSetupProvider";
import { useModal } from "@/context/ModalProvider";
import React from "react";
import { MdAddCircleOutline, MdEdit, MdOutlineInfo } from "react-icons/md";
import PickupForm from "./PickupForm";
import { Modal } from "@/components/modal";
import Image from "next/image";
import { useTrackedStates } from "@/services/enum-api";

export default function PickupLocations() {
  const { openModal, getModalProps } = useModal();
  const { data, setData, nextStep, prevStep } = useAccountSetupContext();
  const { data: rawStates } = useTrackedStates();

  return (
    <div className="mx-auto w-11/12 max-w-xl">
      <Modal title="Add Pickup Location" {...getModalProps("add-location")}>
        <PickupForm />
      </Modal>
      <button
        className="border-green-normal bg-green-light flex min-h-[150px] w-full flex-col items-center justify-center gap-1.5 rounded-2xl border py-4 md:min-h-[200px]"
        onClick={() => openModal("add-location")}
        disabled={data.locations?.length == 4}
      >
        <MdAddCircleOutline className="text-green-normal lg:text-2xl" />
        <p className="text-xs lg:text-sm">Click to add a pickup location</p>
        <div className="text-white-darker flex items-center gap-1">
          <MdOutlineInfo size={14} />
          <p className="text-xs">Maximum: 4 Locations per account</p>
        </div>
      </button>

      <div className="mt-5 flex flex-wrap gap-4 lg:flex-col">
        {data.locations?.map((v, i) => (
          <div
            key={i}
            className="bg-green-light flex w-full items-center gap-3 rounded-lg px-6 py-4 lg:rounded-xl"
          >
            <Image
              src={URL.createObjectURL(v.previewImage)}
              alt=""
              width={52}
              height={52}
            />
            <div className="text-sm">
              <p>{v.address}</p>
              <p className="capitalize">
                {
                  rawStates?.find(
                    (v) => v.stateId == data.stateWasteManagementBoardId,
                  )?.stateName
                }{" "}
                | {v.landmarkName}
              </p>
            </div>
            <button
              className="border-green-normal ml-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border"
              onClick={() => openModal("loc" + i)}
            >
              <MdEdit size={15} className="text-primary" />
            </button>
            <Modal title="Edit Pickup Location" {...getModalProps("loc" + i)}>
              <PickupForm data={v} index={i} />
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
