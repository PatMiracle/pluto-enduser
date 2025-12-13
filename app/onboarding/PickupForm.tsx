import { Button } from "@/components/ui/button";
import { useAccountSetupContext } from "@/context/AccountSetupProvider";
import { useModal } from "@/context/ModalProvider";
import useOptions from "@/hooks/use-options";
import {
  useLocationTypes,
  useTrackedLandmarks,
  useTrackedLGAs,
  useTrackedStates,
} from "@/services/enum-api";
import useAuthStore from "@/store/AuthStore";
import { useForm, useStore } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import {
  MdApartment,
  MdCloudUpload,
  MdCottage,
  MdFlag,
  MdLocationOn,
  MdOutlineInfo,
  MdOutlineMail,
} from "react-icons/md";
import { toast } from "sonner";

export default function LocationForm() {
  const { user } = useAuthStore();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const { closeModal } = useModal();

  const { data } = useAccountSetupContext();
  const stateId = data.stateWasteManagementBoardId;

  const { data: rawStates } = useTrackedStates();
  const states = useOptions(rawStates, "stateId", "stateName");
  const { data: rawLGAs } = useTrackedLGAs({ stateId });
  const lgas = useOptions(rawLGAs?.data, "lgaId", "lgaName");
  const { data: rawLandmarks } = useTrackedLandmarks(
    {
      stateId,
      lgaId: data.orgLGA,
    },
    { enabled: !!data.orgLGA },
  );
  const landmarks = useOptions(
    rawLandmarks?.data,
    "postalCodeId",
    "landmarkName",
  );
  //   const { data: rawLocationTypes } = useLocationTypes(
  //     {
  //       stateId,
  //       lGAId: lga,
  //       landmarkId: postalId,
  //     },
  //     { enabled: !!postalId },
  //   );
  //   const locationTypes = useOptions(
  //     rawLocationTypes?.data,
  //     "locationTypeId",
  //     "locationTypeName",
  //   );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB. Please choose a smaller file.");
      return;
    }
    setPreviewImage(e.target.files?.[0] ?? null);
  };

  return (
    <div>
      <div className="flex gap-1 pb-5">
        <MdOutlineInfo className="text-red-normal" />
        <p className="text-white-darker text-sm">
          Only Location owners or caretakers can add this feature
        </p>
      </div>
    </div>
  );
}
