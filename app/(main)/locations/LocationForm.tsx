import {
  FormInput,
  FormPhoneField,
  FormSelect,
} from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { useModal } from "@/context/ModalProvider";
import useOptions from "@/hooks/use-options";
import defaultErrorHandler from "@/lib/error-handler";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useCreateLocation } from "@/services/client-locations";
import {
  useLocationTypes,
  useTrackedLandmarks,
  useTrackedLGAs,
  useTrackedStates,
} from "@/services/enum-api";
import { useUserQuery } from "@/services/user-api";
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
import * as z from "zod";

const formSchema = z.object({
  state: z.number(),
  lga: z.number().min(1, "required"),
  postalId: z.number().min(1, "required"),
  address: z.string().min(1, "required"),
  locationType: z.number().min(1, "required"),
  numFlats: z.number().min(0, "required"),
  population: z.number().min(0, "required"),
  contactFirstName: z.string().min(1, "required"),
  contactLastName: z.string().min(1, "required"),
  contactPhoneNumber: z
    .string()
    .refine((val) => !!toNigeriaIntlFormat(val), {
      message: "Invalid Nigerian phone number",
    })
    .transform((val) => toNigeriaIntlFormat(val)!),
  contactEmail: z.email("Enter a valid email"),
});

export default function LocationForm() {
  const { data: user } = useUserQuery();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const { mutate } = useCreateLocation();
  const { closeModal } = useModal();
  const form = useForm({
    defaultValues: {
      state: user!.stateWasteManagementBoardId ?? 0,
      lga: 0,
      postalId: 0,
      address: "",
      locationType: 0,
      numFlats: 0,
      population: 0,
      contactFirstName: "",
      contactLastName: "",
      contactPhoneNumber: "",
      contactEmail: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!previewImage) {
        return toast.error("Add preview image");
      }

      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, String(val));
      });

      formData.append("previewImage", previewImage);

      mutate(formData, {
        onSuccess: () => {
          toast.success("Location created successfully");
          form.reset();
          setPreviewImage(null);
          closeModal();
        },
        onError: () => {
          toast.error("Failed to create location");
        },
      });
    },
  });

  const {
    values: { state: stateId, lga, postalId },
    isSubmitting,
  } = useStore(form.store, (s) => s);

  const { data: rawStates } = useTrackedStates();
  const states = useOptions(rawStates?.data, "stateId", "stateName");
  const { data: rawLGAs } = useTrackedLGAs({ stateId });
  const lgas = useOptions(rawLGAs?.data, "lgaId", "lgaName");
  const { data: rawLandmarks } = useTrackedLandmarks(
    {
      stateId,
      lgaId: lga as number,
    },
    { enabled: !!lga && typeof lga == "number" },
  );
  const landmarks = useOptions(
    rawLandmarks?.data,
    "postalCodeId",
    "landmarkName",
  );
  const { data: rawLocationTypes } = useLocationTypes(
    {
      stateId,
      lGAId: lga,
      landmarkId: postalId,
    },
    { enabled: !!postalId },
  );
  const locationTypes = useOptions(
    rawLocationTypes?.data,
    "locationTypeId",
    "locationTypeName",
  );

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
      <form
        id="request-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <p className="text-sm">Location Details</p>
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="state"
              children={(field) => {
                return (
                  <FormSelect
                    label="State"
                    options={states}
                    field={field}
                    iconLeft={<MdApartment className="text-primary" />}
                    disabled
                  />
                );
              }}
            />
            <form.Field
              name="lga"
              children={(field) => {
                return (
                  <FormSelect
                    label="LGA"
                    options={lgas}
                    field={field}
                    iconLeft={<MdCottage className="text-primary" />}
                  />
                );
              }}
            />
          </div>
          <form.Field
            name="postalId"
            children={(field) => {
              return (
                <FormSelect
                  label="Landmark"
                  options={landmarks}
                  field={field}
                  iconLeft={<MdFlag className="text-primary" />}
                  disabled={!lga}
                />
              );
            }}
          />
          <form.Field
            name="address"
            children={(field) => {
              return <FormInput label="Address" field={field} />;
            }}
          />
          <form.Field
            name="locationType"
            children={(field) => {
              return (
                <FormSelect
                  label="Location Type"
                  placeholder="Location Type"
                  options={locationTypes}
                  field={field}
                  iconLeft={<MdLocationOn className="text-primary" />}
                  disabled={!postalId}
                />
              );
            }}
          />
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="numFlats"
              children={(field) => {
                return (
                  <FormInput
                    label="No. of Flat/Rooms"
                    type="number"
                    field={field}
                    min={0}
                  />
                );
              }}
            />
            <form.Field
              name="population"
              children={(field) => {
                return (
                  <FormInput
                    label="Population"
                    type="number"
                    field={field}
                    min={0}
                  />
                );
              }}
            />
          </div>
          <p className="text-sm">Location Contact Details</p>
          <form.Field
            name="contactFirstName"
            children={(field) => {
              return (
                <FormInput
                  label="First Name"
                  placeholder="First Name"
                  field={field}
                />
              );
            }}
          />
          <form.Field
            name="contactLastName"
            children={(field) => {
              return (
                <FormInput
                  label="Last Name"
                  placeholder="Last Name"
                  field={field}
                />
              );
            }}
          />
          <form.Field
            name="contactPhoneNumber"
            children={(field) => {
              return (
                <FormPhoneField
                  label="Phone Number"
                  placeholder="Phone Number"
                  field={field}
                />
              );
            }}
          />
          <form.Field
            name="contactEmail"
            children={(field) => {
              return (
                <FormInput
                  label="Email Address"
                  placeholder="Email"
                  field={field}
                  iconLeft={<MdOutlineMail />}
                />
              );
            }}
          />
          <p className="text-sm">Location Image</p>
          <label
            className="border-primary bg-green-light grid min-h-[120px] cursor-pointer place-content-center rounded-xl border-2 border-dashed py-5 text-center"
            htmlFor="location-image"
          >
            {previewImage && (
              <Image
                src={URL.createObjectURL(previewImage)}
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
        </FieldGroup>
      </form>

      <Field className="my-6">
        <Button type="submit" form="request-form" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Location"}
        </Button>
      </Field>
    </div>
  );
}
