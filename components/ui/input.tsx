"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { MdCalendarMonth } from "react-icons/md";

type InputProps = React.ComponentProps<"input"> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

function Input({
  className,
  type,
  iconLeft,
  iconRight,
  disabled = false,
  value,
  onChange,
  ...props
}: InputProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value as string) : undefined,
  );
  const [open, setOpen] = React.useState(false);

  if (type === "date") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "border-green-light bg-green-light text-primary hover:bg-green-light hover:text-green-normal relative h-9 w-full justify-start rounded-3xl rounded-tl-none px-3 pr-10 pl-10 text-left font-normal",
              !date && "text-primary/70",
              className,
            )}
          >
            <span className="text-green-normal absolute top-1/2 left-3 -translate-y-1/2">
              <MdCalendarMonth />
            </span>

            {date
              ? format(date, "yyyy-MM-dd")
              : props.placeholder || "Pick a date"}

            <span className="text-green-normal absolute top-1/2 right-3 -translate-y-1/2">
              {iconRight}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              setDate(selected);

              // fake event to behave like input change
              onChange?.({
                target: {
                  value: selected ? selected.toISOString().split("T")[0] : "",
                },
              } as any);

              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  // Normal input for other types
  return (
    <div
      className={cn("relative", disabled && "cursor-not-allowed", className)}
    >
      <span className="text-green-normal absolute top-1/2 left-3 -translate-y-1/2 text-xl">
        {iconLeft}
      </span>

      <input
        type={type}
        data-slot="input"
        className={cn(
          "border-green-light bg-green-light text-primary file:text-foreground placeholder:text-primary/70 h-9 w-full min-w-0 border py-1 text-[13px] shadow-xs transition-[color,box-shadow] outline-none",
          iconLeft ? "pl-10" : "pl-3",
          iconRight ? "pr-10" : "pr-3",
          "focus-visible:border-primary rounded-3xl rounded-tl-none",
          disabled && "cursor-not-allowed opacity-80",
        )}
        {...props}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />

      <span className="text-green-normal absolute top-1/2 right-3 -translate-y-1/2 text-xl">
        {iconRight}
      </span>
    </div>
  );
}

export { Input };
