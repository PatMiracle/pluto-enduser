import { FormInput, FormPhoneField } from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { LabeledInput } from "@/components/ui/input";
import { useModal } from "@/context/ModalProvider";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { ClientLocation, useUpdateLocation } from "@/services/client-locations";
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

type Props = {
  data: ClientLocation;
};

const formSchema = z.object({
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

export default function EditLocationForm({ data }: Props) {
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const { mutate } = useUpdateLocation();
  const { closeModal } = useModal();

  const form = useForm({
    defaultValues: {
      contactFirstName: data?.contactFirstName,
      contactLastName: data?.contactLastName,
      contactPhoneNumber: data?.contactPhoneNumber,
      contactEmail: data?.contactEmail,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const v = { ...value, id: data.clientLocationId };
      mutate(v, {
        onSuccess: () => {
          toast.success("Location update successfully");
          setPreviewImage(null);
          closeModal();
        },
        onError: () => {
          toast.error("Failed to update location");
        },
      });
    },
  });

  const { isSubmitting, isDefaultValue } = useStore(form.store, (s) => s);

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
      {!data && (
        <div className="flex gap-1 pb-5">
          <MdOutlineInfo className="text-red-normal" />
          <p className="text-white-darker text-sm">
            Only Location owners or caretakers can add this feature
          </p>
        </div>
      )}
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
            <LabeledInput
              label="State"
              value={data.state}
              iconLeft={<MdApartment className="text-primary" />}
              disabled
              inputClassName="capitalize"
            />
            <LabeledInput
              label="LGA"
              value={data.lga}
              iconLeft={<MdCottage className="text-primary" />}
              disabled
              inputClassName="capitalize"
            />
          </div>
          <LabeledInput
            label="Landmark"
            value={data.landmarkName}
            iconLeft={<MdFlag className="text-primary" />}
            disabled
          />
          <LabeledInput label="Address" value={data.address} disabled />
          <LabeledInput
            label="Location Type"
            value={data.locationTypeName}
            iconLeft={<MdLocationOn className="text-primary" />}
            disabled
          />
          <div className="grid grid-cols-2 gap-4">
            <LabeledInput
              label="No. of Flat/Rooms"
              value={data.numFlats}
              disabled
            />
            <LabeledInput label="Population" value={data.population} disabled />
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
            {previewImage ? (
              <Image
                src={URL.createObjectURL(previewImage)}
                alt=""
                width={250}
                height={200}
              />
            ) : (
              data?.previewImage && (
                <Image
                  src={data.previewImage}
                  alt=""
                  width={250}
                  height={200}
                />
              )
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
        <Button
          type="submit"
          form="request-form"
          disabled={isSubmitting || (isDefaultValue && !previewImage)}
        >
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </Field>
    </div>
  );
}
