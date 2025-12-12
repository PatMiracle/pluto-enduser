"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateUser } from "@/services/user-api";
import { useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { useStates } from "@/services/enum-api";
import * as z from "zod";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useForm, useStore } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { FormInput, FormPhoneField } from "@/components/FormFieldWrapper";
import { toast } from "sonner";
import useAuthStore from "@/store/AuthStore";
import {
  useClientAccount,
  useUpdateClient,
} from "@/services/client-account-api";
import { LabeledInput } from "@/components/LabeledFields";
import defaultErrorHandler from "@/lib/error-handler";

const formSchema = z.object({
  clientAccountId: z.number(),
  orgName: z.string().min(1, "required"),
  streetAddress: z.string().min(1, "required"),
  orgContactFirstName: z.string().min(1, "required"),
  middleName: z.string(),
  orgContactLastName: z.string().min(1, "required"),
  orgEmail: z.union([z.email("Enter a valid email"), z.literal("")]),
  orgPhoneNo: z
    .string()
    .refine((val) => !!toNigeriaIntlFormat(val), {
      message: "Invalid Nigerian phone number",
    })
    .transform((val) => toNigeriaIntlFormat(val)!),
});

const BusinessProfile = () => {
  const { user } = useAuthStore();
  const { data: clientAccount } = useClientAccount();
  const { mutate: updateUser, isPending: isSubmittingUser } = useUpdateUser();
  const { mutate: updateClient, isPending: isUpdatingClient } =
    useUpdateClient();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const client = clientAccount?.[0];

  if (!client || !user) return;

  const defaultValues = {
    clientAccountId: client.clientAccountId,
    orgName: client.orgName,
    streetAddress: client.streetAddress,
    orgContactFirstName: client.orgContactFirstName,
    middleName: client.middleName,
    orgContactLastName: client.orgContactLastName,
    orgEmail: client.orgEmail,
    orgPhoneNo: client.orgPhoneNo,
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (profilePhoto) {
        updateUser(
          { profilePhoto },
          {
            onSuccess: () => toast.success("Updated Profile Image"),
            onError: (e) => defaultErrorHandler(e),
          },
        );
      }

      if (JSON.stringify(defaultValues) !== JSON.stringify(value)) {
        updateClient(value, {
          onSuccess: () => {
            toast.success("Updated Profile Details");
            setIsEditing(false);
          },
          onError: (e) => defaultErrorHandler(e),
        });
      } else setIsEditing(false);
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

  const { isDefaultValue } = useStore(form.store, (s) => s);
  const { data: rawStates } = useStates();
  const isSubmitting = isSubmittingUser || isUpdatingClient;

  return (
    <div className="max-w-4xl px-5 pb-5">
      <div className="flex justify-between">
        <p className="text-lg">Business Profile</p>
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
            name="orgName"
            children={(field) => (
              <FormInput
                label="Business Name"
                field={field}
                disabled={!isEditing}
              />
            )}
          />
          <form.Field
            name="streetAddress"
            children={(field) => (
              <FormInput
                label="Business Physical Address"
                field={field}
                placeholder="Enter street address"
                disabled={!isEditing}
              />
            )}
          />
          <form.Field
            name="orgContactFirstName"
            children={(field) => (
              <FormInput
                label="Business Owner First Name"
                field={field}
                disabled={!isEditing}
              />
            )}
          />
          <form.Field
            name="middleName"
            children={(field) => (
              <FormInput
                label="Business Owner Middle Initial"
                field={field}
                placeholder="- - -"
                disabled={!isEditing}
              />
            )}
          />
          <form.Field
            name="orgContactLastName"
            children={(field) => (
              <FormInput
                label="Business Owner Last Name"
                field={field}
                disabled={!isEditing}
              />
            )}
          />
          <LabeledInput
            label="Primary Email Address"
            value={user?.email}
            disabled
          />
          <form.Field
            name="orgEmail"
            children={(field) => (
              <FormInput
                label="Secondary Email Address (Optional)"
                field={field}
                disabled={!isEditing}
              />
            )}
          />
          <form.Field
            name="orgPhoneNo"
            children={(field) => (
              <FormPhoneField
                label="Business Contact Phone Number"
                field={field}
                disabled={!isEditing}
              />
            )}
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

export default BusinessProfile;
