"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateUser, useUserQuery } from "@/services/user-api";
import { useState } from "react";
import { MdApartment, MdClose, MdEdit, MdOutlineCottage } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { useLGAs, useStates } from "@/services/enum-api";

import * as z from "zod";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useForm, useStore } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useOptions from "@/hooks/use-options";
import Image from "next/image";
import NigeriaFlag from "@/public/icons/nigerian-flag.svg";
import { toast } from "sonner";
import defaultErrorHandler from "@/lib/error-handler";

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
  residentState: z.number().min(0, "State is required"),
  lga: z.number().min(0, "LGA is required"),
  streetAddress: z.string().min(1, "Pickup address is required"),
});

const Profile = () => {
  const { data: user } = useUserQuery();
  const { mutate } = useUpdateUser();
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
      try {
        mutate(data);
        toast.success("Profile Updated");
      } catch (error) {
        defaultErrorHandler(error);
      } finally {
        setIsEditing(false);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(e.target.files?.[0] ?? null);
  };

  const { residentState: stateId, lga } = useStore(form.store, (s) => s.values);
  const submitting = useStore(form.store, (state) => state.isSubmitting);
  const { data: rawStates } = useStates();
  const statesOptions = useOptions(rawStates?.data, "stateId", "stateName");
  const { data: rawLGAs } = useLGAs({ stateId: stateId! });
  const lgaOptions = useOptions(rawLGAs?.data, "lgaId", "lgaName");

  const { isDefaultValue } = useStore(form.store, (s) => s);

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
            <AvatarImage src={URL.createObjectURL(profilePhoto)} />
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
                <FormFieldWrapper
                  label="First Name"
                  as="input"
                  {...field}
                  state={field.state}
                  disabled={!isEditing}
                />
              );
            }}
          />
          <form.Field
            name="lastName"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Last Name"
                  as="input"
                  {...field}
                  state={field.state}
                  disabled={!isEditing}
                />
              );
            }}
          />
          <form.Field
            name="email"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Email Address"
                  as="input"
                  {...field}
                  state={field.state}
                  disabled={!isEditing}
                />
              );
            }}
          />
          <div>
            <Label className="mb-1">Phone Number</Label>
            <div className="flex gap-2">
              <span className="bg-green-light text-green-normal flex h-9 min-w-16 items-center justify-center gap-1 rounded-3xl rounded-tl-none px-4 text-xs">
                <Image src={NigeriaFlag} alt="" width={20} height={20} />
                <span>+234</span>
              </span>
              <form.Field
                name="phoneNumber"
                children={(field) => {
                  return (
                    <FormFieldWrapper
                      as="input"
                      type="tel"
                      {...field}
                      state={field.state}
                      disabled={!isEditing}
                    />
                  );
                }}
              />
            </div>
          </div>

          <div>
            <Label className="mb-1">Country</Label>
            <Input value={"Nigeria"} disabled iconLeft={<MdApartment />} />
          </div>
          <form.Field
            name="residentState"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="State"
                  as="selectable"
                  option={statesOptions}
                  {...field}
                  state={field.state}
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
                <FormFieldWrapper
                  label="LGA"
                  as="selectable"
                  option={lgaOptions}
                  {...field}
                  state={field.state}
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
                <FormFieldWrapper
                  label="Address"
                  as="input"
                  {...field}
                  state={field.state}
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
            disabled={submitting || (!!isDefaultValue && !profilePhoto)}
          >
            Save
          </Button>
        </Field>
      )}
    </div>
  );
};

export default Profile;
