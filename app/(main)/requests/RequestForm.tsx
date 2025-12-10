import FormFieldWrapper, {
  FormInput,
  FormPhoneField,
  FormSelect,
} from "@/components/FormFieldWrapper";
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
import { useModal } from "@/context/ModalProvider";

type Props = {
  data?: ServiceRequest;
};

const formSchema = z.object({
  state: z.number().min(0, "State is required"),
  lga: z.number().min(0, "LGA is required"),
  postalId: z.number().min(0, "Landmark is required"),
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
  const { mutate: createRequest, isPending } = useCreateRequest();
  const { mutate: updateRequest, isPending: isSubmitting } = useUpdateRequest();
  const { closeModal } = useModal();

  const form = useForm({
    defaultValues: {
      state: data?.landmark?.stateId ?? user?.stateWasteManagementBoardId!,
      lga: data?.landmark?.lgaId,
      postalId: data?.landmark?.postalCodeId,
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

      if (data) {
        updateRequest(
          { id: data.serviceRequestId, ...value },
          {
            onSuccess: () => {
              toast.success("Request Updated");
              form.reset();
              closeModal();
            },
            onError: (e) => {
              defaultErrorHandler(e);
            },
          },
        );
      } else {
        createRequest(value, {
          onSuccess: () => {
            toast.success("Request Created!");
            form.reset();
            closeModal();
          },
          onError: (e) => {
            defaultErrorHandler(e);
          },
        });
      }
    },
  });

  const { state: stateId, lga } = useStore(form.store, (s) => s.values);

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
          <div>
            <p className="mb-1 text-sm">Pickup Location Details</p>
            <div className="grid grid-cols-2 gap-3">
              <form.Field
                name="state"
                children={(field) => {
                  return (
                    <FormFieldWrapper
                      label="State"
                      as="selectable"
                      field={field}
                      options={states}
                      iconLeft={<MdApartment className="text-primary" />}
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
                      options={lgas}
                      as="selectable"
                      placeholder="LGA"
                      field={field}
                      iconLeft={<MdOutlineCottage className="text-primary" />}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <form.Field
              name="postalId"
              children={(field) => {
                return (
                  <FormFieldWrapper
                    label="Landmark"
                    as="selectable"
                    placeholder="Landmark"
                    options={landmarks}
                    field={field}
                    iconLeft={<MdFlag className="text-primary" />}
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
                    field={field}
                    iconLeft={<MdCalendarMonth />}
                  />
                );
              }}
            />
          </div>
          <form.Field
            name="pickupAddress"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Pickup Address"
                  placeholder="Pickup Address"
                  as="input"
                  field={field}
                  iconLeft={<MdOutlineLocationOn />}
                />
              );
            }}
          />
          <p className="text-sm">Event Details</p>
          <form.Field
            name="serviceRequestType"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="Event Type"
                  placeholder="Select Event Type"
                  as="selectable"
                  options={serviceRequestTypes}
                  field={field}
                />
              );
            }}
          />
          <form.Field
            name="wasteType"
            children={(field) => {
              return (
                <FormSelect
                  label="Waste Type"
                  placeholder="Select Waste Type"
                  options={wasteTypes}
                  field={field}
                />
              );
            }}
          />
          <form.Field
            name="contactNumber"
            children={(field) => {
              return (
                <FormPhoneField
                  label="Phone Number"
                  placeholder="Contact Number"
                  field={field}
                />
              );
            }}
          />
          <form.Field
            name="contactEmail"
            children={(field) => {
              return (
                <FormInput
                  label="Email Address"
                  placeholder="Email"
                  field={field}
                  iconLeft={<MdOutlineMail />}
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
                  field={field}
                  maxLength={250}
                />
              );
            }}
          />
        </FieldGroup>
      </form>
      <Field className="my-2">
        <Button
          type="submit"
          form="request-form"
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Submitting" : "Submit"}
        </Button>
      </Field>
    </>
  );
}
