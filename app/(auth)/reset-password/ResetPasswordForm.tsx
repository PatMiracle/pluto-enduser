"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import * as z from "zod";
import { useForm, useStore } from "@tanstack/react-form";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import { MdMailOutline } from "react-icons/md";
import api from "@/services/api";
import defaultErrorHandler from "@/lib/error-handler";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
});

export default function ResetPasswordForm() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await api.post("/auth/forgot-password", {
          ...value,
        });
        form.reset();
        toast.success(
          "A password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.",
          {
            duration: 100000,
          },
        );
      } catch (e) {
        defaultErrorHandler(e);
      }
    },
  });

  const submitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <div className="text-center">
      <p className="text-white-darker text-xs md:text-sm">
        Enter your registered email to receive a password reset link
      </p>
      <form
        id="reset-form"
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
        </FieldGroup>
      </form>
      <Field className="mb-10 justify-center gap-5" orientation="horizontal">
        <Button type="button" variant="secondary" asChild className="w-32">
          <Link href="/login">Cancel</Link>
        </Button>
        <Button type="submit" form="reset-form" disabled={submitting}>
          {submitting ? "Sending Link..." : "Send Reset Link"}
        </Button>
      </Field>

      <div className="my-10 grid gap-5">
        <Link href="/login" className="text-sM">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
