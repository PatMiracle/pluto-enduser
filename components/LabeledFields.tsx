import { ReactNode } from "react";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import NigeriaFlag from "@/public/icons/nigerian-flag.svg";

interface BaseProps {
  label?: string;
}

export function LabeledInput({
  label,
  name,
  ...props
}: BaseProps & InputProps) {
  return (
    <div className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}
      <Input name={name} {...props} />
    </div>
  );
}

export interface LabeledSelectProps extends BaseProps {
  options: { value: string | number; label: string }[];
  iconLeft?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  value?: string | number;
  onSelect: (v: string | number) => void;
  name?: string;
}

export function LabeledSelect({
  label,
  placeholder,
  iconLeft,
  disabled = false,
  value,
  onSelect,
  name,
  options,
}: LabeledSelectProps) {
  return (
    <div className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}
      <Select
        value={value ? String(value) : ""}
        onValueChange={(v) => onSelect(+v || v)}
      >
        <SelectTrigger className="w-full capitalize" disabled={disabled}>
          <div className="flex max-w-[80%] items-center gap-2">
            <span className="text-primary">{iconLeft}</span>
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
            {options.map((opt) => (
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
    </div>
  );
}

export function LabeledPhoneField({
  label,
  name,
  ...props
}: BaseProps & Omit<InputProps, "type">) {
  return (
    <div className="w-full space-y-0.5">
      {label && (
        <Label htmlFor={name} className="text-xs font-normal">
          {label}
        </Label>
      )}
      <div className="flex w-full gap-3">
        <span className="bg-green-light text-green-normal flex h-9 min-w-16 items-center justify-center gap-1 rounded-3xl rounded-tl-none px-4 text-xs opacity-70">
          <Image src={NigeriaFlag} alt="" width={20} height={20} />
          <span>+234</span>
        </span>
        <Input id={name} name={name} type="tel" className="w-full" {...props} />
      </div>
    </div>
  );
}
