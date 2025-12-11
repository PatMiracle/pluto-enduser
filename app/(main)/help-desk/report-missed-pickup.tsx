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
import useOptions from "@/hooks/use-options";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useClientLocations } from "@/services/client-locations";
import { IssueTypes, useIssueTypes } from "@/services/issues";
import { useCreateTicket } from "@/services/ticket";
import { useUserQuery } from "@/services/user-api";
import { useForm, useStore } from "@tanstack/react-form";
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
  affectedAddress: z.number().min(1, "Please select an issue type"),
  description: z.string().min(1, "Please describe your query"),
  issueTypeId: z.number().min(1, "Please select an issue type"),
});

const ReportMissed = () => {
  const { data: user } = useUserQuery();
  const { data: rawLocations } = useClientLocations();
  const locations = useOptions(
    rawLocations?.data,
    "clientLocationId",
    "address",
  );

  const { mutate, isPending: isSubmitting } = useCreateTicket();
  const { closeModal } = useModal();

  const form = useForm({
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      phoneNumber: "",
      email: "",
      affectedAddress: 0,
      description: "",
      issueTypeId: IssueTypes.MissedPickup,
    },
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      mutate(
        {
          ...value,
          customData: {
            affectedAddress:
              rawLocations!.data.find(
                (e) => e.clientLocationId === value.affectedAddress,
              )?.address ?? "",
            pickupLocationId: value.affectedAddress,
          } as any,
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
        id="report-missed-form"
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
                <FormSelect
                  options={locations}
                  label="Affected Address"
                  placeholder="Select Affected Address"
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
          form="report-missed-form"
          className="max-w-min px-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </Field>
    </>
  );
};

export default ReportMissed;
