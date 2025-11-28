import FormFieldWrapper from "@/components/FormFieldWrapper";
import { Switch } from "@/components/switch";
import { FieldGroup } from "@/components/ui/field";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useUserQuery } from "@/services/user-api";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { MdMailOutline } from "react-icons/md";
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
  issueTypeId: z.string("Please select an issue type"),
  description: z.string().min(1, "Please describe your query"),
});

const AppProblemForm = () => {
  const { data: user } = useUserQuery();

  const form = useForm({
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      phoneNumber: "",
      email: "",
      issueTypeId: "",
      description: "",
    },
    validators: { onSubmit: formSchema },
  });

  const [samePhone, setSamePhone] = useState(false);
  const [sameEmail, setSameEmail] = useState(false);

  return (
    <form
      id="app-problem-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-3">
        <form.Field
          name="name"
          children={(field) => {
            return (
              <FormFieldWrapper
                label="Name"
                as="input"
                {...field}
                state={field.state}
                disabled
              />
            );
          }}
        />

        <div>
          <form.Field
            name="phoneNumber"
            children={(field) => {
              return (
                <FormFieldWrapper
                  as="input"
                  type="number"
                  label="Contact Number"
                  placeholder="Contact Number"
                  {...field}
                  state={field.state}
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
                else form.setFieldValue("phoneNumber", `${user?.phoneNumber}`);

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
                <FormFieldWrapper
                  as="input"
                  label="Email"
                  placeholder="Type in your Email Address"
                  iconLeft={<MdMailOutline />}
                  {...field}
                  state={field.state}
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
          name="issueTypeId"
          children={(field) => {
            return (
              <FormFieldWrapper
                as="selectable"
                option={[]}
                label="Issue Type"
                placeholder="Select Issue Type"
                iconLeft={<MdMailOutline />}
                {...field}
                state={field.state}
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
                maxLength={250}
                {...field}
                state={field.state}
              />
            );
          }}
        />
      </FieldGroup>
    </form>
  );
};

export default AppProblemForm;
