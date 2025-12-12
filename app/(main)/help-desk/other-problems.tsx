import FormFieldWrapper, {
  FormInput,
  FormPhoneField,
  FormSelect,
} from "@/components/FormFieldWrapper";
import { Switch } from "@/components/switch";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { LabeledInput } from "@/components/ui/input";
import { useModal } from "@/context/ModalProvider";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { IssueTypes } from "@/services/issues";
import { useCreateTicket } from "@/services/ticket";
import useAuthStore from "@/store/AuthStore";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { MdMailOutline } from "react-icons/md";
import { toast } from "sonner";
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
  description: z.string().min(1, "Please describe your query"),
  issueTypeId: z.number().min(1, "Please select an issue type"),
});

const OtherProblems = () => {
  const { user } = useAuthStore();
  const { mutate, isPending: isSubmitting } = useCreateTicket();
  const { closeModal } = useModal();

  const form = useForm({
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      phoneNumber: "",
      email: "",
      description: "",
      issueTypeId: IssueTypes.Others,
    },
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      mutate(
        {
          ...value,
        },
        {
          onSuccess: () => {
            toast.success("Issue submitted successfully");
            closeModal();
          },
        },
      );
    },
  });

  const [samePhone, setSamePhone] = useState(false);
  const [sameEmail, setSameEmail] = useState(false);

  return (
    <>
      <form
        id="others-form"
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
            name="description"
            children={(field) => {
              return (
                <FormFieldWrapper
                  as="textarea"
                  label="Query"
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
          form="others-form"
          disabled={isSubmitting}
          className="max-w-min px-6"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </Field>
    </>
  );
};

export default OtherProblems;
