import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  iconLeft,
  iconRight,
  disabled = false,
  ...props
}: React.ComponentProps<"input"> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}) {
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
          "file:text-foreground selection:bg-primary/20 placeholder:text-primary/70 border-green-light bg-green-light file:bg-green-light text-primary disabled:text-green-dark h-10 w-full min-w-0 border py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80",
          iconLeft ? "pl-10" : "pl-3",
          iconRight ? "pr-10" : "pr-3",
          "rounded-3xl rounded-tl-none",
          "focus-visible:border-primary",
        )}
        {...props}
        disabled={disabled}
      />
      <span className="text-green-normal absolute top-1/2 right-3 -translate-y-1/2 text-xl">
        {iconRight}
      </span>
    </div>
  );
}

export { Input };
