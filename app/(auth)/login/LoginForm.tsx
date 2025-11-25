"use client";

import GoogleBtn from "@/components/auth/GoogleBtn";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import * as z from "zod";
import { useForm, useStore } from "@tanstack/react-form";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import {
  MdLockOutline,
  MdMailOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";
import defaultErrorHandler from "@/lib/error-handler";

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await axios.post("/api/login", {
          ...value,
          role: "CLIENT",
          rememberMe: true,
        });
        const data = res.data;
        setToken(data.accessToken);
        router.replace("/dashboard");
      } catch (e) {
        defaultErrorHandler(e);
      }
    },
  });
  const submitting = useStore(form.store, (state) => state.isSubmitting);
  const [showPsw, setShowPsw] = useState(false);

  return (
    <div className="text-center">
      <GoogleBtn />
      <FieldSeparator className="lg:10 my-5">
        or use your email to Login
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
                  {...field}
                  state={field.state}
                  type={showPsw ? "text" : "password"}
                />
              );
            }}
          />
        </FieldGroup>
      </form>

      <Field className="mb-10">
        <Button type="submit" form="login-form" disabled={submitting}>
          {submitting ? "Logging In..." : "Log In"}
        </Button>
      </Field>

      <div className="my-10 grid gap-5">
        <Link href="/reset-password">
          Forgot <span className="text-green-normal">Password</span>
        </Link>

        <Link href="/signup" className="underline underline-offset-2 lg:hidden">
          I don’t have an Account
        </Link>
      </div>
    </div>
  );
}
