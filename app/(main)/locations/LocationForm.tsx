import FormFieldWrapper from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { ClientLocation } from "@/services/client-locations";
import { useUserQuery } from "@/services/user-api";
import { useForm } from "@tanstack/react-form";
import { MdApartment, MdOutlineInfo } from "react-icons/md";
import * as z from "zod";

type Props = {
  data?: ClientLocation;
};

const formSchema = z.object({
  state: z.number(),
  lga: z.number().min(0, "LGA is required"),
  postalId: z.number("Landmark is required"),
  address: z.string().min(1, "Pickup address is required"),
  numFlats: z.number("Required"),
  population: z.number("Required"),
  contactFirstName: z.string().min(1, "Required"),
  contactLastName: z.string().min(1, "Required"),
  wasteType: z.string().min(1, "Waste type is required"),
  contactPhoneNumber: z
    .string()
    .refine((val) => !!toNigeriaIntlFormat(val), {
      message: "Invalid Nigerian phone number",
    })
    .transform((val) => toNigeriaIntlFormat(val)!),
  contactEmail: z.email("Enter a valid email"),
});

export default function LocationForm({ data }: Props) {
  const { data: user } = useUserQuery();

  const form = useForm({
    defaultValues: {
      state: user!.stateWasteManagementBoardId,
      lga: data?.lga ?? 0,
      postalId: data?.postalId,
      address: data?.address ?? "",
      numFlats: data?.numFlats,
      population: data?.population,
      contactFirstName: data?.contactFirstName,
      contactLastName: data?.contactLastName,
      contactEmail: data?.contactEmail,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {},
  });

  return (
    <div>
      {!data && (
        <div className="flex items-center gap-1">
          <MdOutlineInfo className="text-red-normal" />
          <p className="text-white-darker text-sm">
            Only Location owners or caretakers can add this feature
          </p>
        </div>
      )}
      <form
        id="request-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* <div className="flex gap-3"> */}
          <form.Field
            name="state"
            children={(field) => {
              return (
                <FormFieldWrapper
                  label="State"
                  as="selectable"
                  option={[]}
                  {...field}
                  state={field.state}
                  iconLeft={<MdApartment className="text-primary" />}
                  disabled
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
          //  disabled={submitting}
        >
          {/* {submitting ? "Submitting" : "Submit"} */}
        </Button>
      </Field>
    </div>
  );
}
