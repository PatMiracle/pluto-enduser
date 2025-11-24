"use client";

import GoogleBtn from "@/components/auth/GoogleBtn";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import * as z from "zod";
import { useForm, useStore } from "@tanstack/react-form";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import {
  MdCheckCircle,
  MdLockOutline,
  MdMailOutline,
  MdRadioButtonUnchecked,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useState } from "react";
import api from "@/services/api";
import defaultErrorHandler from "@/lib/error-handler";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const passwordRequirements = [
  { id: 1, text: "At least 8 characters", regex: /.{8,}/ },
  { id: 2, text: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { id: 3, text: "At least 1 lowercase letter", regex: /[a-z]/ },
  { id: 4, text: "At least 1 number", regex: /[0-9]/ },
  { id: 5, text: "At least 1 special character", regex: /[^A-Za-z0-9]/ },
];

function validatePassword(password: string) {
  return passwordRequirements.map((req) => ({
    id: req.id,
    text: req.text,
    valid: req.regex.test(password),
  }));
}

export default function SignupForm() {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitting(true);
      try {
        await api.post("/auth/register", {
          ...value,
        });
        toast.success(
          "Registration successful. Check for verification email.",
          {
            duration: 100000,
          },
        );
      } catch (e) {
        defaultErrorHandler(e);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const password = useStore(form.store, (state) => state.values.password);

  const [showPsw, setShowPsw] = useState(false);

  return (
    <div className="text-center">
      <GoogleBtn />
      <FieldSeparator className="lg:10 my-5">
        or use your email to register
      </FieldSeparator>

      <form
        id="login-form"
        className="py-5"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => {
              return (
                <FormFieldWrapper
                  as="input"
                  placeholder="Type in your Email Address"
                  iconLeft={<MdMailOutline />}
                  {...field}
                  state={field.state}
                />
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              return (
                <FormFieldWrapper
                  as="input"
                  placeholder="Password"
                  iconLeft={<MdLockOutline />}
                  iconRight={
                    <span
                      className="cursor-pointer"
                      onClick={() => setShowPsw(!showPsw)}
                    >
                      {showPsw ? <MdVisibility /> : <MdVisibilityOff />}
                    </span>
                  }
                  name={field.name}
                  state={field.state}
                  handleChange={field.handleChange}
                  handleBlur={field.handleBlur}
                  type={showPsw ? "text" : "password"}
                />
              );
            }}
          />
          <div>
            {password &&
              validatePassword(password).map((req) => (
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
        </FieldGroup>
      </form>

      <Field className="mb-10">
        <Button type="submit" form="login-form" disabled={submitting}>
          {submitting ? "Registering..." : "Register Me"}
        </Button>
      </Field>

      <div className="my-10 grid gap-5">
        <p className="text-xs">
          By signing up I agree to the Terms & Conditions and to the Privacy
          Policy
        </p>
        <Link href="/login" className="underline underline-offset-2 lg:hidden">
          I Already have an Account
        </Link>
      </div>
    </div>
  );
}
