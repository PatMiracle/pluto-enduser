import { Modal } from "@/components/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useModal } from "@/context/ModalProvider";
import { cn } from "@/lib/utils";
import { ClientLocation } from "@/services/client-locations";
import Image from "next/image";
import {
  MdAddCircleOutline,
  MdEdit,
  MdOutlineCottage,
  MdOutlineInfo,
} from "react-icons/md";
import LocationForm from "./LocationForm";
import EditLocationForm from "./EditLocationForm";

export function AddLocation() {
  const { getModalProps, openModal } = useModal();
  return (
    <>
      <Modal title="Add Pickup Location" {...getModalProps("add-location")}>
        <LocationForm />
      </Modal>
      <button
        onClick={() => openModal("add-location")}
        className="border-white-dark min-h-[200px] w-full flex-1 rounded-2xl border p-4"
      >
        <div className="border-green-normal bg-green-light flex min-h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl border">
          <MdAddCircleOutline className="text-green-normal lg:text-2xl" />
          <p className="text-xs lg:text-sm">Click to add a pickup location</p>
          <div className="text-white-darker flex items-center gap-1">
            <MdOutlineInfo size={14} />
            <p className="text-[10px] lg:text-xs">
              Maximum: 4 Locations per account
            </p>
          </div>
        </div>
      </button>
    </>
  );
}

type LocationCardProps = { data: ClientLocation };

export function LocationCard({ data }: LocationCardProps) {
  const { getModalProps, openModal } = useModal();
  return (
    <div className="border-white-dark flex min-h-[200px] w-full flex-col gap-3 rounded-2xl border p-5">
      {/* Top Row */}
      <div className="flex justify-between">
        <p className="text-[11px] capitalize xl:text-[13px]">
          {data.landmarkName}
        </p>

        <div
          className={cn(
            "bg-end rounded px-2 py-0.5",
            data.locationStatus == "ACTIVE" && "bg-primary",
          )}
        >
          <p className="text-[8px] text-white xl:text-[11px]">
            {data.locationStatus}
          </p>
        </div>
      </div>

      {/* Image */}
      <Image
        src={data.previewImage}
        width={332}
        height={187}
        alt=""
        className="h-[152px] w-full rounded bg-black/20 object-cover"
      />

      {/* Address */}
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 text-[11px] sm:text-xs xl:text-[13px]">
          {data.address}
        </p>
        <p className="text-white-darker text-[11px] capitalize sm:text-xs xl:text-[13px]">
          {data.state} | {data.lga}
        </p>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        {/* Location Type */}
        <div className="border-green-light flex items-center gap-2 rounded-full border px-3 py-1.5">
          <MdOutlineCottage size={12} className="text-green-normal" />
          <p className="text-[10px] capitalize sm:text-xs xl:text-[13px]">
            {data.locationTypeName}
          </p>
        </div>

        {/* Edit Button */}
        <button
          className="border-green-light flex h-[30px] w-[30px] items-center justify-center rounded-full border"
          onClick={() => openModal("" + data.clientLocationId)}
        >
          <MdEdit size={15} className="text-primary" />
        </button>

        <Modal
          title="Edit Pickup Location"
          {...getModalProps("" + data.clientLocationId)}
        >
          <EditLocationForm data={data} />
        </Modal>
      </div>
    </div>
  );
}

export const LocationCardSkeleton = () => {
  return (
    <div className="border-white-dark flex min-h-[200px] w-full flex-col gap-3 rounded-2xl border p-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-28 rounded" />
        <Skeleton className="h-4 w-10 rounded" />
      </div>

      {/* Image */}
      <Skeleton className="h-[152px] w-full rounded" />

      {/* Address Lines */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>

      {/* Bottom section */}
      <div className="flex items-center justify-between">
        {/* Type button placeholder */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>

        {/* Edit icon placeholder */}
        <Skeleton className="h-[30px] w-[30px] rounded-full" />
      </div>
    </div>
  );
};
