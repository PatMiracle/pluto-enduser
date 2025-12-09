// ONLY WORKS WITH TANSTACK FORM

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
import { Input, InputProps } from "./ui/input";
import Image from "next/image";
import NigeriaFlag from "@/public/icons/nigerian-flag.svg";

interface TanstackField extends Record<string, any> {
  name: string;
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

interface BaseProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  field: TanstackField;
}

export interface SelectProps extends BaseProps {
  as: "selectable";
  options: { value: string | number; label: string }[];
  iconLeft?: ReactNode;
}

export interface FormFieldInput extends InputProps, BaseProps {
  as: "input";
}

export interface TextareaProps extends BaseProps {
  as: "textarea";
  maxLength?: number;
}

export type FormFieldWrapperProps =
  | SelectProps
  | FormFieldInput
  | TextareaProps;

export default function FormFieldWrapper({
  as,
  ...rest
}: FormFieldWrapperProps) {
  if (as == "input") {
    return <FormInput {...rest} />;
  } else if (as == "selectable") {
    return <FormSelect {...(rest as SelectProps)} />;
  }
  return <FormTextarea {...(rest as TextareaProps)} />;
}

export function FormInput({
  label,
  placeholder,
  disabled = false,
  field,
  ...rest
}: Omit<FormFieldInput, "as">) {
  const { handleBlur, handleChange, state, name } = field;
  const isInvalid = state?.meta?.isTouched && !state?.meta?.isValid;

  return (
    <Field data-invalid={isInvalid} className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type={rest.type || "text"}
        value={state.value}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        {...rest}
      />
      {isInvalid && state?.meta?.errors && (
        <FieldError errors={state.meta.errors} />
      )}
    </Field>
  );
}

export function FormSelect({
  label,
  placeholder,
  disabled = false,
  field,
  ...rest
}: Omit<SelectProps, "as">) {
  const { handleChange, state, name } = field;
  const isInvalid = state?.meta?.isTouched && !state?.meta?.isValid;

  return (
    <Field data-invalid={isInvalid} className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}
      <Select
        value={state.value ? String(state.value) : ""}
        onValueChange={(v) => handleChange(+v || v)}
      >
        <SelectTrigger className="w-full capitalize" disabled={disabled}>
          <div className="flex max-w-[80%] items-center gap-2">
            <span className="text-primary">{rest.iconLeft}</span>
            <div className="flex-1 overflow-hidden text-[13px]">
              <SelectValue
                placeholder={placeholder}
                className="block truncate capitalize"
              />
            </div>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="capitalize">{label}</SelectLabel>
            {rest.options.map((opt) => (
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
      {isInvalid && state?.meta?.errors && (
        <FieldError errors={state.meta.errors} />
      )}
    </Field>
  );
}

export function FormTextarea({
  label,
  placeholder,
  disabled = false,
  field,
  ...rest
}: Omit<TextareaProps, "as">) {
  const { handleBlur, handleChange, state, name } = field;
  const isInvalid = state?.meta?.isTouched && !state?.meta?.isValid;

  return (
    <Field data-invalid={isInvalid} className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}
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
          maxLength={rest.maxLength}
        />
        {rest.maxLength && (
          <InputGroupAddon className="bg-green-light" align="block-end">
            <InputGroupText className="text-primary ml-auto tabular-nums">
              <span className="text-xs">
                {state.value.length}/{rest.maxLength} characters max
              </span>
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
      {isInvalid && state?.meta?.errors && (
        <FieldError errors={state.meta.errors} />
      )}
    </Field>
  );
}

export function FormPhoneField({
  label,
  placeholder,
  disabled = false,
  field,
  ...rest
}: Omit<FormFieldInput, "as">) {
  const { handleBlur, handleChange, state, name } = field;
  const isInvalid = state?.meta?.isTouched && !state?.meta?.isValid;

  return (
    <Field data-invalid={isInvalid} className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}
      <div className="flex gap-3">
        <span className="bg-green-light text-green-normal flex h-9 min-w-16 items-center justify-center gap-1 rounded-3xl rounded-tl-none px-4 text-xs opacity-70">
          <Image src={NigeriaFlag} alt="" width={20} height={20} />
          <span>+234</span>
        </span>
        <Input
          id={name}
          name={name}
          type="tel"
          value={state.value}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          maxLength={11}
          className="w-full"
          {...rest}
        />
      </div>
      {isInvalid && state?.meta?.errors && (
        <FieldError errors={state.meta.errors} />
      )}
    </Field>
  );
}
