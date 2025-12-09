"use client";

import { cn } from "@/lib/utils";

type Props = {
  activeIndex: number;
};

export default function StepProgressBar({ activeIndex }: Props) {
  const steps = ["Board", "Profile", "Pickup Locations", "Summary"];

  const isMobile = window.innerWidth < 500;

  return (
    <div className="mx-auto flex items-center justify-center py-12">
      {steps.map((label, i) => {
        const isActive = activeIndex === i;

        return (
          <div key={label} className="flex items-center">
            {/* Step Container */}
            <div className="relative flex flex-col items-center">
              {/* Step Label */}
              <span
                className={cn(
                  "absolute -top-5 mb-2 text-[10px] whitespace-nowrap transition-colors md:text-xs",
                  isActive ? "text-primary" : "text-white-dark",
                )}
              >
                {label}
              </span>

              {/* Circle with Number */}
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                  isActive ? "bg-green-light-active" : "bg-green-light",
                )}
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-primary" : "bg-green-light-active",
                  )}
                >
                  <span className="text-white-normal text-[10px] font-medium">
                    {i + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Connector Dots */}
            {i !== steps.length - 1 && (
              <div className="mx-2 flex items-center gap-1.5 md:mx-3 md:gap-2.5">
                {Array.from({ length: isMobile ? 4 : 6 }).map((_, j) => (
                  <div
                    key={j}
                    className="bg-black-light-hover h-1.5 w-1.5 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
