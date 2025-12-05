import FormFieldWrapper, {
  FormInput,
  FormPhoneField,
  FormSelect,
} from "@/components/FormFieldWrapper";
import { Switch } from "@/components/switch";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { LabeledInput } from "@/components/ui/input";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useUserQuery } from "@/services/user-api";
import { useForm, useStore } from "@tanstack/react-form";
import { useState } from "react";
import { MdLocationOn, MdMailOutline } from "react-icons/md";
import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .transform((val) => {
      const result = toNigeriaIntlFormat(val);
      if (!result) {
        throw new Error("Invalid Nigerian phone number");
      }
      return result;
    }),
  email: z.email("Please enter a valid email"),
  affectedAddress: z.string().min(1, "Please select an issue type"),
  description: z.string().min(1, "Please describe your query"),
});

const ReportHazard = () => {
  const { data: user } = useUserQuery();

  const form = useForm({
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      phoneNumber: "",
      email: "",
      affectedAddress: "",
      description: "",
    },
    validators: { onSubmit: formSchema },
  });

  const [samePhone, setSamePhone] = useState(false);
  const [sameEmail, setSameEmail] = useState(false);
  const { isSubmitting } = useStore(form.store, (s) => s);

  return (
    <>
      <form
        id="report-hazard"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-3">
          <LabeledInput
            label="Name"
            value={`${user?.firstName} ${user?.lastName}`}
            disabled
          />
          <div>
            <form.Field
              name="phoneNumber"
              children={(field) => {
                return (
                  <FormPhoneField
                    label="Contact Number"
                    placeholder="Contact Number"
                    field={field}
                    disabled={samePhone}
                  />
                );
              }}
            />
            <div className="mt-3 flex items-center gap-1">
              <Switch
                active={samePhone}
                setActive={() => {
                  if (samePhone) form.setFieldValue("phoneNumber", "");
                  else
                    form.setFieldValue("phoneNumber", `${user?.phoneNumber}`);

                  setSamePhone(!samePhone);
                }}
              />
              <p className="text-xs">Same as account Phone Number</p>
            </div>
          </div>

          <div>
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <FormInput
                    label="Email"
                    placeholder="Type in your Email Address"
                    iconLeft={<MdMailOutline />}
                    field={field}
                    disabled={sameEmail}
                  />
                );
              }}
            />
            <div className="mt-3 flex items-center gap-1">
              <Switch
                active={sameEmail}
                setActive={() => {
                  if (sameEmail) form.setFieldValue("email", "");
                  else form.setFieldValue("email", `${user?.email}`);

                  setSameEmail(!sameEmail);
                }}
              />
              <p className="text-xs">Same as account Email</p>
            </div>
          </div>

          <form.Field
            name="affectedAddress"
            children={(field) => {
              return (
                <FormInput
                  label="Incident Address"
                  placeholder="Enter Incident Address"
                  iconLeft={<MdLocationOn />}
                  field={field}
                />
              );
            }}
          />

          <form.Field
            name="description"
            children={(field) => {
              return (
                <FormFieldWrapper
                  as="textarea"
                  label="Query"
                  placeholder="Provide additional details..."
                  maxLength={250}
                  field={field}
                />
              );
            }}
          />
        </FieldGroup>
      </form>
      <Field className="my-6 items-center">
        <Button
          type="submit"
          form="request-form"
          disabled={isSubmitting}
          className="max-w-min px-6"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </Field>
    </>
  );
};

export default ReportHazard;
