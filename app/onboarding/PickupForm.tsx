import { LabeledPhoneField, LabeledSelect } from "@/components/LabeledFields";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/input";
import {
  Location,
  useAccountSetupContext,
} from "@/context/AccountSetupProvider";
import { useModal } from "@/context/ModalProvider";
import useOptions from "@/hooks/use-options";
import api from "@/lib/apiClient";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import {
  useLocationTypes,
  useTrackedLandmarks,
  useTrackedLGAs,
  useTrackedStates,
} from "@/services/enum-api";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MdApartment,
  MdCloudUpload,
  MdCottage,
  MdFlag,
  MdLocationOn,
  MdOutlineMail,
} from "react-icons/md";
import { toast } from "sonner";

type Props = {
  data?: Location;
  index?: number;
};

export default function PickupForm({ data: locationData, index }: Props) {
  const { data, setData } = useAccountSetupContext();
  const [formData, setFormData] = useState<Location>(
    locationData || ({ state: data.stateWasteManagementBoardId } as Location),
  );

  const { closeModal } = useModal();
  const stateId = data.stateWasteManagementBoardId;
  const { data: states } = useTrackedStates();
  const { data: rawLGAs } = useTrackedLGAs({ stateId });
  const lgas = useOptions(rawLGAs?.data, "lgaId", "lgaName");
  const { data: rawLandmarks } = useTrackedLandmarks(
    {
      stateId,
      lgaId: formData?.lga,
    },
    { enabled: !!formData?.lga },
  );
  const landmarks = useOptions(
    rawLandmarks?.data,
    "postalCodeId",
    "landmarkName",
  );

  interface LocationType {
    locationTypeId: number;
    locationTypeName: string;
    locationTypeCode: string;
  }
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);

  const locationTypeOptions = useOptions(
    locationTypes,
    "locationTypeId",
    "locationTypeName",
  );

  useEffect(() => {
    (async () => {
      const res = await api.get("/location-types");
      const data: LocationType[] = res.data.data;
      setLocationTypes(data);
    })();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB. Please choose a smaller file.");
      return;
    }
    if (file) handleInputChange("previewImage", file);
  };

  const handleInputChange = (
    field: keyof Location,
    value: string | number | File,
  ): void => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      } as Location;
    });
  };

  const handleSubmit = () => {
    const requiredFields: (keyof Partial<typeof formData>)[] = [
      "lga",
      "address",
      "locationType",
      "contactFirstName",
      "contactLastName",
      "contactPhoneNumber",
      "contactEmail",
      "previewImage",
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!toNigeriaIntlFormat(formData.contactPhoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail!)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const landmarkName = rawLandmarks?.data.find(
      (v) => v.postalCodeId == formData.postalId,
    )?.landmarkName;

    const values: any = {
      ...formData,
      state: stateId,
      contactPhoneNumber: toNigeriaIntlFormat(formData.contactPhoneNumber),
      landmarkName,
    };

    if (locationData) {
      setData({
        locations: data.locations
          ? data.locations.map((loc, i) => (index === i ? { ...values } : loc))
          : [],
      });
    } else {
      setData({
        locations: [...(data.locations ?? []), values],
      });
    }

    closeModal();
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid gap-4"
      >
        <p className="text-sm">Location Details</p>
        <div className="grid grid-cols-2 gap-4">
          <LabeledInput
            label="State"
            value={states?.find((v) => v.stateId == formData.state)?.stateName}
            inputClassName="capitalize"
            iconLeft={<MdApartment className="text-primary" />}
            disabled
          />
          <LabeledSelect
            label="LGA"
            placeholder="LGA"
            value={formData.lga}
            options={lgas}
            iconLeft={<MdCottage className="text-primary" />}
            onSelect={(v) => {
              handleInputChange("lga", v);
              handleInputChange("postalId", "");
            }}
          />
        </div>
        <LabeledSelect
          label="Landmark"
          options={landmarks}
          value={formData.postalId}
          onSelect={(v) => handleInputChange("postalId", v)}
          iconLeft={<MdFlag className="text-primary" />}
          disabled={!formData.lga}
        />
        <LabeledInput
          label="Address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
        <LabeledSelect
          label="Location Type"
          placeholder="Location Type"
          options={locationTypeOptions}
          value={formData.locationType}
          onSelect={(v) => handleInputChange("locationType", v)}
          iconLeft={<MdLocationOn className="text-primary" />}
          disabled={!formData.postalId}
        />
        <div className="grid grid-cols-2 gap-4">
          <LabeledInput
            label="No. of Flat/Rooms"
            type="number"
            min={0}
            value={formData.numFlats}
            onChange={(e) => handleInputChange("numFlats", e.target.value)}
          />
          <LabeledInput
            label="Population"
            type="number"
            value={formData.population}
            onChange={(e) => handleInputChange("population", e.target.value)}
          />
        </div>
        <p className="text-sm">Location Contact Details</p>
        <LabeledInput
          label="First Name"
          placeholder="First Name"
          value={formData.contactFirstName}
          onChange={(e) =>
            handleInputChange("contactFirstName", e.target.value)
          }
        />
        <LabeledInput
          label="Last Name"
          placeholder="Last Name"
          value={formData.contactLastName}
          onChange={(e) => handleInputChange("contactLastName", e.target.value)}
        />
        <LabeledPhoneField
          label="Phone Number"
          placeholder="Phone Number"
          value={formData.contactPhoneNumber}
          onChange={(e) =>
            handleInputChange("contactPhoneNumber", e.target.value)
          }
        />
        <LabeledInput
          label="Email Address"
          placeholder="Email"
          value={formData.contactEmail}
          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
          iconLeft={<MdOutlineMail />}
        />
        <p className="text-sm">Location Image</p>
        <label
          className="border-primary bg-green-light grid min-h-[120px] cursor-pointer place-content-center rounded-xl border-2 border-dashed py-5 text-center"
          htmlFor="location-image"
        >
          {formData.previewImage && (
            <Image
              src={URL.createObjectURL(formData.previewImage)}
              alt=""
              width={250}
              height={200}
            />
          )}
          <MdCloudUpload size={32} className="text-primary mx-auto" />
          <p className="text-sm">Click to upload an image</p>
          <p className="text-white-darker text-xs">
            Supports: JPEG, PNG, GIF, WebP (Max 5MB)
          </p>
        </label>
        <input
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          type="file"
          id="location-image"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button type="submit">
          {locationData ? "Save" : "Create Location"}
        </Button>
      </form>
    </div>
  );
}
