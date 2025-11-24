import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-primary/70 selection:bg-primary/20 border-green-light bg-green-light text-primary flex field-sizing-content min-h-16 w-full border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // "rounded-3xl rounded-tl-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
