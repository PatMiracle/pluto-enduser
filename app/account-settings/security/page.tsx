"use client";
import { validatePassword } from "@/app/(auth)/signup/SignupForm";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";
import { cn } from "@/lib/utils";
import { useForm, useStore } from "@tanstack/react-form";
import React, { useState } from "react";
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { toast } from "sonner";

import { z } from "zod";

const formSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Security = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data } = await api.post("/auth/change-password", {
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        });

        toast.success(data?.message ?? "Password changed successfully", {
          duration: 100000,
        });
        form.reset();
      } catch (error) {
        defaultErrorHandler(error);
      }
    },
  });

  const { oldPassword, newPassword, confirmPassword } = useStore(
    form.store,
    (s) => s.values,
  );

  const isFormValid = () => {
    return (
      oldPassword.trim() !== "" &&
      newPassword.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      newPassword === confirmPassword &&
      !validatePassword(newPassword).some((req) => !req.valid)
    );
  };

  const { isSubmitting } = useStore(form.store, (s) => s);

  return (
    <div className="px-4">
      <p className="text-lg">Security Settings</p>

      <div className="border-white-dark mt-5 grid max-w-2xl gap-5 rounded-lg border p-5">
        <p className="text-white-darker text-sm">Change Password</p>
        <form
          id="security-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
            <form.Field
              name="oldPassword"
              children={(field) => {
                return (
                  <FormFieldWrapper
                    label="Old Password"
                    as="input"
                    type={showOldPassword ? "text" : "password"}
                    field={field}
                    placeholder="Enter your current password"
                    iconRight={
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="mt-2"
                      >
                        {showOldPassword ? (
                          <MdVisibility />
                        ) : (
                          <MdVisibilityOff />
                        )}
                      </button>
                    }
                  />
                );
              }}
            />
            <div className="hidden lg:block" />
            <div>
              <form.Field
                name="newPassword"
                children={(field) => {
                  return (
                    <FormFieldWrapper
                      label="New Password"
                      as="input"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      field={field}
                      iconRight={
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="mt-2"
                        >
                          {showNewPassword ? (
                            <MdVisibility />
                          ) : (
                            <MdVisibilityOff />
                          )}
                        </button>
                      }
                    />
                  );
                }}
              />
              <div>
                {newPassword &&
                  validatePassword(newPassword).map((req) => (
                    <div key={req.id} className="my-1 flex">
                      {req.valid ? (
                        <MdCheckCircle className="text-primary" />
                      ) : (
                        <MdRadioButtonUnchecked className="text-white-dark" />
                      )}

                      <p
                        className={cn(
                          "pl-2 text-xs",
                          req.valid ? "text-primary" : "text-white-dark",
                        )}
                      >
                        {req.text}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <form.Field
              name="confirmPassword"
              children={(field) => {
                return (
                  <div>
                    <FormFieldWrapper
                      label="Confirm New Password"
                      as="input"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      field={field}
                      iconRight={
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="mt-2"
                        >
                          {showConfirmPassword ? (
                            <MdVisibility />
                          ) : (
                            <MdVisibilityOff />
                          )}
                        </button>
                      }
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-red-normal text-xs">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </FieldGroup>
        </form>

        <Field>
          <Button
            type="submit"
            form="security-form"
            className="max-w-36"
            disabled={!isFormValid() || isSubmitting}
          >
            Change Password
          </Button>
        </Field>
      </div>
    </div>
  );
};

export default Security;
