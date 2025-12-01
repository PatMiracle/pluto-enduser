import FormFieldWrapper from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";
import {
  ServiceRequest,
  useCreateRequest,
} from "@/services/service-requests-api";
import { useUserQuery } from "@/services/user-api";
import { useForm, useStore } from "@tanstack/react-form";
import {
  MdApartment,
  MdCalendarMonth,
  MdFlag,
  MdOutlineCottage,
  MdOutlineLocationOn,
  MdOutlineMail,
} from "react-icons/md";
import { toast } from "sonner";
import * as z from "zod";

type Props = {
  data?: ServiceRequest;
};

const formSchema = z.object({
  state: z.number("State is required"),
  lga: z.number("LGA is required"),
  postalId: z.number("Landmark is required"),
  startDate: z.string("Pickup date is required"),

  serviceRequestType: z.string(),
  wasteType: z.string(),
  contactNumber: z.string(),
  contactEmail: z.email("Enter a valid email"),
  pickupAddress: z.string(),
  description: z.string(),
  contactName: z.string(),
});

export default function RequestForm({ data }: Props) {
  const { data: user } = useUserQuery();
  const { mutate } = useCreateRequest();

  const form = useForm({
    defaultValues: {
      state: data?.landmark.stateId || user?.stateWasteManagementBoardId,
      lga: data?.landmark.lgaId,
      postalId: data?.paymentId,
      startDate: data?.startDate,
      serviceRequestType: data?.serviceRequestType,
      wasteType: data?.wasteType,
      contactNumber: data?.contactNumber,
      contactEmail: data?.contactEmail,
      pickupAddress: data?.pickupAddress,
      description: data?.description || "",
      contactName: data?.contactName,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
      } catch (e) {
        defaultErrorHandler(e);
      }
    },
  });

  const lga = useStore(form.store, (s) => s.values.lga);
  const submitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <>
      <form
        id="request-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-3">
          <div className="flex gap-3">
            <form.Field
              name="state"
              children={(field) => {
                return (
                  <FormFieldWrapper
                    label="State"
                    as="input"
                    {...field}
                    state={field.state}
                    iconLeft={<MdApartment />}
                    disabled
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
                    option={[]}
                    as="selectable"
                    placeholder="LGA"
                    {...field}
                    state={field.state}
                    iconLeft={<MdOutlineCottage />}
                  />
                );
              }}
            />
          </div>
          <div className="flex gap-3">
            <form.Field
              name="postalId"
              children={(field) => {
                return (
                  <FormFieldWrapper
                    label="Landmark"
                    as="selectable"
                    placeholder="Landmark"
                    option={[]}
                    {...field}
                    state={field.state}
                    iconLeft={<MdFlag />}
                    disabled={!lga}
                  />
                );
              }}
            />
            <form.Field
              name="startDate"
              children={(field) => {
                return (
                  <FormFieldWrapper
                    label="Pickup Date"
                    as="input"
                    {...field}
                    state={field.state}
                    iconLeft={<MdCalendarMonth />}
                  />
                );
              }}
            />
          </div>
          <p className="text-sm">Event Details</p>
          <form.Field
            name="serviceRequestType"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Event Type"
                  placeholder="Select Event Type"
                  as="selectable"
                  option={[]}
                  {...field}
                  state={field.state}
                />
              );
            }}
          />
          <form.Field
            name="wasteType"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Waste Type"
                  placeholder="Select Waste Type"
                  as="selectable"
                  option={[]}
                  {...field}
                  state={field.state}
                />
              );
            }}
          />
          <form.Field
            name="contactNumber"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Phone number"
                  placeholder="Contact Number"
                  as="input"
                  type="tel"
                  {...field}
                  state={field.state}
                />
              );
            }}
          />
          <form.Field
            name="contactEmail"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Email Address"
                  placeholder="Email"
                  as="input"
                  {...field}
                  state={field.state}
                  iconLeft={<MdOutlineMail />}
                />
              );
            }}
          />
          <form.Field
            name="pickupAddress"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Pickup Address"
                  placeholder="Pickup Address"
                  as="input"
                  {...field}
                  state={field.state}
                  iconLeft={<MdOutlineLocationOn />}
                />
              );
            }}
          />
          <form.Field
            name="description"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Describe what needs to be moved"
                  as="textarea"
                  placeholder="Enter description..."
                  {...field}
                  state={field.state}
                  maxLength={250}
                />
              );
            }}
          />
        </FieldGroup>
      </form>
      <Field className="my-2">
        <Button type="submit" form="request-form" disabled={submitting}>
          {submitting ? "Submitting" : "Submit"}
        </Button>
      </Field>
    </>
  );
}
