import { ReactNode } from "react";
import { Label } from "./ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";
import { Field, FieldError } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface BaseProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;

  // For TanStack Field States
  state: {
    value: any;
    meta?: {
      isTouched: boolean;
      isValid: boolean;
      errors: any;
    };
  };
  handleChange: (value: any) => void;
  handleBlur: () => void;
}

/* -----------------------------
   Selectable Field
------------------------------ */
export interface SelectProps extends BaseProps {
  as: "selectable";
  option: { value: string | number; label: string }[];
  iconLeft?: ReactNode;
}

/* -----------------------------
   Input Field
------------------------------ */
export interface InputProps extends BaseProps {
  as: "input";
  type?: React.ComponentProps<"input">["type"];
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

/* -----------------------------
   Textarea Field
------------------------------ */
export interface TextareaProps extends BaseProps {
  as: "textarea";
  maxLength?: number;
}

/* -----------------------------
   Final Union Type
------------------------------ */
export type FormFieldWrapperProps = SelectProps | InputProps | TextareaProps;

export default function FormFieldWrapper({
  name,
  label,
  placeholder,
  disabled = false,
  className,
  state,
  as,
  handleChange,
  handleBlur,
  ...rest
}: FormFieldWrapperProps) {
  const isInvalid = state?.meta?.isTouched && !state?.meta?.isValid;

  return (
    <Field data-invalid={isInvalid} className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}

      {as == "input" ? (
        <>
          <Input
            id={name}
            name={name}
            type={(rest as InputProps).type || "text"}
            value={state.value}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            aria-invalid={isInvalid}
            iconLeft={(rest as InputProps).iconLeft}
            iconRight={(rest as InputProps).iconRight}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
          />
        </>
      ) : as == "selectable" ? (
        <Select
          value={state.value ? String(state.value) : ""}
          onValueChange={(v) => handleChange(+v)}
        >
          <SelectTrigger className="w-full capitalize" disabled={disabled}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="capitalize">{label}</SelectLabel>
              {(rest as SelectProps).option.map((opt) => (
                <SelectItem
                  key={String(opt.value)}
                  value={String(opt.value)}
                  className="cursor-pointer capitalize"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <InputGroup>
          <InputGroupTextarea
            id={name}
            name={name}
            value={state.value}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            rows={6}
            disabled={disabled}
            className="min-h-24 resize-none"
            aria-invalid={isInvalid}
            maxLength={(rest as TextareaProps).maxLength}
          />
          {(rest as TextareaProps).maxLength && (
            <InputGroupAddon className="bg-green-light" align="block-end">
              <InputGroupText className="text-primary ml-auto tabular-nums">
                <span className="text-xs">
                  {state.value.length}/{(rest as TextareaProps).maxLength} words
                  max
                </span>
              </InputGroupText>
            </InputGroupAddon>
          )}
        </InputGroup>
      )}

      {isInvalid && state?.meta?.errors && (
        <FieldError errors={state.meta.errors} />
      )}
    </Field>
  );
}
