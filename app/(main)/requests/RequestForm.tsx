import FormFieldWrapper from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import useOptions from "@/hooks/use-options";
import defaultErrorHandler from "@/lib/error-handler";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import {
  useServiceRequestTypes,
  useTrackedLandmarks,
  useTrackedLGAs,
  useTrackedStates,
  useWasteTypes,
} from "@/services/enum-api";
import {
  ServiceRequest,
  useCreateRequest,
  useUpdateRequest,
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
import NigeriaFlag from "@/public/icons/nigerian-flag.svg";
import * as z from "zod";
import Image from "next/image";
import { Label } from "@/components/ui/label";

type Props = {
  data?: ServiceRequest;
};

const formSchema = z.object({
  state: z.number("State is required"),
  lga: z.number("LGA is required"),
  postalId: z.number("Landmark is required"),
  startDate: z.string().min(1, "Pickup date is required"),
  serviceRequestType: z.string().min(1, "Event Type is required"),
  wasteType: z.string().min(1, "Waste type is required"),
  contactNumber: z
    .string()
    .refine((val) => !!toNigeriaIntlFormat(val), {
      message: "Invalid Nigerian phone number",
    })
    .transform((val) => toNigeriaIntlFormat(val)!),
  contactEmail: z.email("Enter a valid email"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  description: z.string().min(1, "Description is required"),
});

export default function RequestForm({ data }: Props) {
  const { data: user } = useUserQuery();
  const { mutate: createRequest } = useCreateRequest();
  const { mutate: updateRequest } = useUpdateRequest();

  const form = useForm({
    defaultValues: {
      state: data?.landmark?.stateId ?? user?.stateWasteManagementBoardId!,
      lga: data?.landmark?.lgaId ?? 0,
      postalId: data?.landmark?.postalCodeId ?? 0,

      startDate: data?.startDate ?? "",

      serviceRequestType: data?.serviceRequestType ?? "",
      wasteType: data?.wasteType ?? "",

      contactNumber: data?.contactNumber ?? "",
      contactEmail: data?.contactEmail ?? "",

      pickupAddress: data?.pickupAddress ?? "",
      description: data?.description ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!value.state || !value.lga || !value.postalId) {
        return toast.error("Please complete all location fields");
      }
      try {
        if (data) {
          updateRequest({ id: data.serviceRequestId, ...value });
          toast.success("Request Updated");
        } else {
          createRequest(value);
          toast.success("Request Created!");
        }
        form.reset();
      } catch (e) {
        defaultErrorHandler(e);
      }
    },
  });

  const stateId = useStore(form.store, (s) => s.values.state);
  const lga = useStore(form.store, (s) => s.values.lga);
  const submitting = useStore(form.store, (state) => state.isSubmitting);

  const { data: rawStates } = useTrackedStates();
  const states = useOptions(rawStates?.data, "stateId", "stateName");
  const { data: rawLGAs } = useTrackedLGAs({ stateId });
  const lgas = useOptions(rawLGAs?.data, "lgaId", "lgaName");
  const { data: rawLandmarks } = useTrackedLandmarks(
    {
      stateId,
      lgaId: lga,
    },
    { enabled: !!lga },
  );
  const landmarks = useOptions(
    rawLandmarks?.data,
    "postalCodeId",
    "landmarkName",
  );
  const { data: eventTypes } = useServiceRequestTypes();
  const serviceRequestTypes = useOptions(eventTypes?.data, "name", "label");

  const { data: wTypes } = useWasteTypes();
  const wasteTypes = useOptions(
    wTypes?.data,
    "wasteClassCode",
    "wasteClassName",
  );

  return (
    <>
      <form
        id="request-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="flex gap-3">
            <form.Field
              name="state"
              children={(field) => {
                return (
                  <FormFieldWrapper
                    label="State"
                    as="selectable"
                    option={states}
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
                    option={lgas}
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
                    option={landmarks}
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
                    type="date"
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
                  option={serviceRequestTypes}
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
                  option={wasteTypes}
                  {...field}
                  state={field.state}
                />
              );
            }}
          />
          <div>
            <Label className="mb-1.5">Phone Number</Label>
            <div className="flex gap-2">
              <span className="bg-green-light text-green-normal flex h-9 min-w-16 items-center justify-center gap-1 rounded-3xl rounded-tl-none px-4 text-xs">
                <Image src={NigeriaFlag} alt="" width={20} height={20} />
                <span>+234</span>
              </span>
              <form.Field
                name="contactNumber"
                children={(field) => {
                  return (
                    <FormFieldWrapper
                      placeholder="Contact Number"
                      as="input"
                      type="tel"
                      {...field}
                      state={field.state}
                    />
                  );
                }}
              />
            </div>
          </div>
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
