import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

const formSchema = z.object({
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
  description: z
    .string()
    .min(1, "Please describe your query")
    .min(10, "Query too short."),
});

const AppProblemForm = () => {
  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      email: "",
      issueTypeId: "",
      description: "",
    },
    validators: { onSubmit: formSchema },
  });

  return <div>AppProblemForm</div>;
};

export default AppProblemForm;
