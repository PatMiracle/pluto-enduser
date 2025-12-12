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
import { cn } from "@/lib/utils";
import { IssueTypes } from "@/services/issues";
import { useCreateTicket } from "@/services/ticket";
import useAuthStore from "@/store/AuthStore";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useState } from "react";
import { IoRemoveSharp } from "react-icons/io5";
import { MdCloudUpload, MdLocationOn, MdMailOutline } from "react-icons/md";
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
  affectedAddress: z.string().min(1, "Please select an issue type"),
  description: z.string().min(1, "Please describe your query"),
  issueTypeId: z.number().min(1, "Please select an issue type"),
});

const ReportHazard = () => {
  const { user } = useAuthStore();

  const { mutate, isPending: isSubmitting } = useCreateTicket();
  const { closeModal } = useModal();

  const form = useForm({
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      phoneNumber: "",
      email: "",
      affectedAddress: "",
      description: "",
      issueTypeId: IssueTypes.EnvironmentalHazard,
    },
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      if (images.length === 0) {
        toast.error("Please add an image");
        return;
      }
      mutate(
        {
          ...value,
          customData: {
            affectedAddress: value.affectedAddress,
          } as any,
          images: images.map((e) => ({
            image: e,
          })) as any,
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

  const [images, setImages] = useState<File[]>([]);
  const maxImages = 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(
        0,
        maxImages - images.length || 0,
      );
      setImages((prev) => [...prev, ...newFiles]);
    }
  };
  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((img, i) => i !== index));
  };

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
          <div>
            <div className="flex justify-between text-sm">
              <span>Add Images *</span>
              <span>
                {images.length}/{maxImages}
              </span>
            </div>
            <label
              className={cn(
                "border-primary bg-green-light mt-1 mb-3 grid min-h-[120px] cursor-pointer place-content-center rounded-xl border-2 border-dashed py-5 text-center",
                images.length >= maxImages && "cursor-not-allowed opacity-80",
              )}
              htmlFor="location-image"
            >
              <MdCloudUpload size={32} className="text-primary mx-auto" />
              <p className="text-sm">Click to upload an image</p>
              <p className="text-white-darker text-xs">Max size: 10MB</p>
            </label>
            <input
              accept="image/*"
              type="file"
              id="location-image"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
              disabled={images.length == maxImages}
            />
            {images.map((file, i) => (
              <SelectedImageItem
                file={file}
                key={i}
                onRemove={() => handleRemove(i)}
              />
            ))}
          </div>
        </FieldGroup>
      </form>
      <Field className="my-6 items-center">
        <Button
          type="submit"
          form="report-hazard"
          disabled={isSubmitting}
          className="max-w-min px-6"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </Field>
    </>
  );
};

interface SelectedImageItemProps {
  file: File;
  onRemove: () => void;
}

function SelectedImageItem({ file, onRemove }: SelectedImageItemProps) {
  let fileName = file.name;
  const fileExt = fileName.split(".").pop();
  if (fileName.length > 30) {
    fileName = `${fileName.slice(0, 20)}...${fileExt}`;
  }

  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <div className="border-white-dark flex flex-2 items-center gap-3 rounded-md border px-3 py-1.5">
        <Image
          src={URL.createObjectURL(file)}
          alt=""
          width={500}
          height={500}
          className="h-5 w-7 object-cover"
        />
        {fileName}
      </div>
      <Button type="button" onClick={onRemove} variant={"secondary"}>
        <IoRemoveSharp />
      </Button>
    </div>
  );
}

export default ReportHazard;
