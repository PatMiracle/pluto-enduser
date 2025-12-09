import {
  LabeledInput,
  LabeledPhoneField,
  LabeledSelect,
} from "@/components/LabeledFields";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalProvider";
import useOptions from "@/hooks/use-options";
import { useStates, useTrackedLGAs } from "@/services/enum-api";
import { usePickupLocations } from "@/services/pickup-location";
import { useUserQuery } from "@/services/user-api";
import { useState } from "react";
import {
  MdApartment,
  MdOutlineCottage,
  MdOutlineLocationOn,
  MdOutlineMail,
} from "react-icons/md";

export interface LocationInfo {
  LGA?: number;
  address?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhoneNumber?: string;
}

type Props = {
  setLocationInfo: (c: LocationInfo) => void;
};

export default function ChoosePickupLocation({ setLocationInfo }: Props) {
  const { data: user } = useUserQuery();
  const { data: states } = useStates();
  const { data: lgas } = useTrackedLGAs(
    { stateId: user!.stateWasteManagementBoardId! },
    { enabled: !!user?.stateWasteManagementBoardId },
  );
  const lgaOptions = useOptions(lgas?.data, "lgaId", "lgaName");

  const [LGA, setLGA] = useState<number | undefined>(undefined);
  const { data: pickupLocations } = usePickupLocations({
    stateId: user!.stateWasteManagementBoardId ?? undefined,
    lgaId: LGA || undefined,
  });
  const pickupOptions = useOptions(
    pickupLocations,
    "pickupStationId",
    "address",
  );
  const [location, setLocation] = useState<string | undefined>(undefined);

  const address = pickupLocations?.find(
    (v) => v.pickupStationId == location,
  )?.address;

  const contactPhoneNumber = pickupLocations?.find(
    (v) => v.pickupStationId == location,
  )?.contactPhoneNumber;

  const contactEmail = pickupLocations?.find(
    (v) => v.pickupStationId == location,
  )?.contactEmail;

  const contactName = pickupLocations?.find(
    (v) => v.pickupStationId == location,
  )?.contactName;

  const state = states?.data.find(
    ({ stateId }) => stateId == user?.stateWasteManagementBoardId,
  )?.stateName;

  const { closeModal } = useModal();

  const handleSave = () => {
    setLocationInfo({
      contactEmail,
      contactName,
      contactPhoneNumber,
      address,
      LGA,
    });
    closeModal();
  };

  return (
    <div className="grid gap-3 py-4">
      <LabeledInput
        value={state ? state + " State" : ""}
        placeholder="State"
        disabled
        inputClassName="capitalize"
        iconLeft={<MdApartment />}
      />
      <LabeledSelect
        value={LGA}
        options={lgaOptions}
        onSelect={(v) => setLGA(+v!)}
        iconLeft={<MdOutlineCottage className="text-primary" />}
      />

      <p className="text-sm">Reward Pickup Location</p>
      <LabeledSelect
        placeholder="Select Pickup Location"
        value={location}
        options={pickupOptions}
        onSelect={(v) => setLocation(v as string)}
        iconLeft={<MdOutlineLocationOn className="text-primary" />}
        disabled={!LGA}
      />

      <p className="text-sm">Location Address</p>
      <LabeledInput value={address} disabled placeholder="Address" />
      <LabeledPhoneField
        value={contactPhoneNumber}
        placeholder="Phone Number"
        disabled
      />
      <LabeledInput
        value={contactEmail}
        iconLeft={<MdOutlineMail />}
        placeholder="Email"
        disabled
      />
      <Button
        className="mx-auto mt-4 max-w-max px-8"
        onClick={handleSave}
        disabled={!LGA || !location}
      >
        Save
      </Button>
    </div>
  );
}
