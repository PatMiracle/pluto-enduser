"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateUser } from "@/services/user-api";
import { useEffect, useState } from "react";
import { MdApartment, MdClose, MdEdit, MdOutlineCottage } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { useLGAs, useStates } from "@/services/enum-api";
import * as z from "zod";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useForm, useStore } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  FormInput,
  FormPhoneField,
  FormSelect,
} from "@/components/FormFieldWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useOptions from "@/hooks/use-options";
import { toast } from "sonner";
import defaultErrorHandler from "@/lib/error-handler";
import useAuthStore from "@/store/AuthStore";

const formSchema = z.object({
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
  phoneNumber: z
    .string()
    .refine((val) => !!toNigeriaIntlFormat(val), {
      message: "Invalid Nigerian phone number",
    })
    .transform((val) => toNigeriaIntlFormat(val)!),
  email: z.email("Enter a valid email"),
  residentState: z.number().min(1, "State is required"),
  lga: z.number().min(1, "LGA is required"),
  streetAddress: z.string().min(1, "required"),
});

const PersonalProfile = () => {
  const { user } = useAuthStore();
  const { mutate, isPending: isSubmitting } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
      phoneNumber: user!.phoneNumber,
      residentState: user!.residentState,
      lga: user!.lga,
      streetAddress: user!.streetAddress,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const data = profilePhoto ? { ...value, profilePhoto } : value;

      mutate(data, {
        onSuccess: () => {
          toast.success("Profile Updated");
          setIsEditing(false);
        },
        onError: (e) => defaultErrorHandler(e),
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB. Please choose a smaller file.");
      return;
    }
    setProfilePhoto(e.target.files?.[0] ?? null);
  };

  const { residentState: stateId } = useStore(form.store, (s) => s.values);
  const { data: rawStates } = useStates();
  const statesOptions = useOptions(rawStates?.data, "stateId", "stateName");
  const { data: rawLGAs } = useLGAs({ stateId: stateId! });
  const lgaOptions = useOptions(rawLGAs?.data, "lgaId", "lgaName");

  const {
    isDefaultValue,
    values: { residentState },
  } = useStore(form.store, (s) => s);

  useEffect(() => {
    if (!isDefaultValue) {
      form.setFieldValue("lga", 0);
    }
  }, [residentState]);

  return (
    <div className="max-w-4xl px-5">
      <div className="flex justify-between">
        <p className="text-lg">Profile</p>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setProfilePhoto(null);
            form.reset();
          }}
          className="text-green-normal text-2xl"
        >
          {isEditing ? <MdClose className="text-red-normal" /> : <MdEdit />}
        </button>
      </div>

      <div className="flex items-center gap-3 pt-5">
        <Avatar className="relative size-32">
          {isEditing && profilePhoto ? (
            <AvatarImage
              src={URL.createObjectURL(profilePhoto)}
              className="object-cover"
            />
          ) : user!.photoURL ? (
            <AvatarImage src={user!.photoURL} />
          ) : null}
          <AvatarFallback>
            {user?.firstName.slice(0, 1)}
            {user?.lastName.slice(0, 1)}
          </AvatarFallback>
          {isEditing && (
            <>
              <label
                htmlFor="avatar"
                className="text-white-normal absolute flex h-full w-full cursor-pointer items-end justify-end bg-black/50 pb-3"
              >
                <IoCameraOutline size={24} className="mx-auto" />
              </label>
              <input
                type="file"
                id="avatar"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
                disabled={!isEditing}
              />
            </>
          )}
        </Avatar>
        <div className="grid gap-1.5">
          <div>
            <p className="text-white-darker text-sm">Account Access Type</p>
            <p className="bg-green-light mt-1 rounded-sm px-3 py-1.5 text-sm capitalize">
              {user?.accountType} Account
            </p>
          </div>
          <div>
            <p className="text-white-darker text-sm">Waste Management Board</p>
            <p className="bg-green-light mt-1 rounded-sm px-3 py-1.5 text-sm capitalize">
              {rawStates &&
                rawStates.data.find(
                  (v) => v.stateId == user?.stateWasteManagementBoardId,
                )?.stateName}
            </p>
          </div>
        </div>
      </div>

      <form
        id="profile-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="py-5 lg:grid lg:grid-cols-2 lg:gap-x-7">
          <form.Field
            name="firstName"
            children={(field) => {
              return (
                <FormInput
                  label="First Name"
                  field={field}
                  disabled={!isEditing}
                />
              );
            }}
          />
          <form.Field
            name="lastName"
            children={(field) => {
              return (
                <FormInput
                  label="Last Name"
                  field={field}
                  disabled={!isEditing}
                />
              );
            }}
          />
          <form.Field
            name="email"
            children={(field) => {
              return (
                <FormInput
                  label="Email Address"
                  field={field}
                  disabled={!isEditing}
                />
              );
            }}
          />
          <div>
            <Label className="mb-1">Phone Number</Label>

            <form.Field
              name="phoneNumber"
              children={(field) => {
                return <FormPhoneField field={field} disabled={!isEditing} />;
              }}
            />
          </div>

          <div>
            <Label className="mb-1">Country</Label>
            <Input value={"Nigeria"} disabled iconLeft={<MdApartment />} />
          </div>
          <form.Field
            name="residentState"
            children={(field) => {
              return (
                <FormSelect
                  label="State"
                  options={statesOptions}
                  field={field}
                  disabled={!isEditing}
                  iconLeft={<MdApartment className="text-primary" />}
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
                  options={lgaOptions}
                  field={field}
                  disabled={!isEditing}
                  iconLeft={<MdOutlineCottage className="text-primary" />}
                />
              );
            }}
          />
          <form.Field
            name="streetAddress"
            children={(field) => {
              return (
                <FormInput
                  label="Address"
                  field={field}
                  disabled={!isEditing}
                />
              );
            }}
          />
        </FieldGroup>
      </form>

      {isEditing && (
        <Field className="my-2">
          <Button
            type="submit"
            form="profile-form"
            className="ml-auto max-w-20"
            disabled={isSubmitting || (!!isDefaultValue && !profilePhoto)}
          >
            {isSubmitting ? "Saving" : "Save"}
          </Button>
        </Field>
      )}
    </div>
  );
};

export default PersonalProfile;
