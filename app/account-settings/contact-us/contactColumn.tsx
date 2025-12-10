"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ContactCenterDetails } from "@/services/contact-center";

export const contactColumns: ColumnDef<ContactCenterDetails>[] = [
  {
    accessorKey: "contactName",
    header: "Representative",
  },
  {
    accessorKey: "lga",
    header: "Station Location",
    cell: ({ cell }) => (
      <span className="capitalize">{cell.renderValue() as string}</span>
    ),
  },
  {
    accessorKey: "contactPhoneNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "openingHours",
    header: "Operation Hours",
    cell: ({ cell }) => {
      const v = cell.renderValue() as any;
      return (
        <div>
          {v.map((e: any) => {
            return (
              <p className="text-wrap">
                {sentenceCase(
                  (e.dayOfWeek.includes("DAY")
                    ? e.dayOfWeek
                    : e.dayOfWeek + "day"
                  ).toLocaleLowerCase() + "s",
                ) +
                  " " +
                  e.openingTime.slice(0, -3) +
                  " - " +
                  e.closingTime.slice(0, -3)}
              </p>
            );
          })}
        </div>
      );
    },
  },
];

function sentenceCase(a: string) {
  return a && a.length ? a.charAt(0).toLocaleUpperCase() + a.slice(1) : a;
}
