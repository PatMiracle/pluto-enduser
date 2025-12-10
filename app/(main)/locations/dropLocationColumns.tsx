"use client";

import { DropLocation } from "@/services/drop-locations";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export const dropLocationColumns: ColumnDef<DropLocation>[] = [
  {
    header: "Contact",
    cell: ({ row }) => {
      const {
        dropLocationId,
        dropOffContactName,
        dropOffContactEmail,
        dropOffContactPhone,
      } = row.original;
      return (
        <div>
          <p className="bg-white-dark w-max rounded-t-sm p-1.5 text-[10px] sm:text-xs xl:text-[13px]">
            Dropoff Site #{dropLocationId}
          </p>

          <CellBox>
            <p>{dropOffContactName}</p>
            <p>{dropOffContactEmail}</p>
            <p>{dropOffContactPhone}</p>
          </CellBox>
        </div>
      );
    },
  },
  {
    accessorKey: "dropOffStreetAddress",
    header: "Location Address",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <CellBox>{v}</CellBox>;
    },
  },
  {
    accessorKey: "collectionTypeName",
    header: "Collection Type",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <CellBox>{v}</CellBox>;
    },
  },
  {
    accessorKey: "openingHours",
    header: "Operation Hours",
    cell: ({ row }) => {
      const { openingHours } = row.original;
      return (
        <CellBox>
          {openingHours.map((e) => {
            return (
              <p className="text-wrap">
                {sentenceCase(
                  (e.dayOfWeek.includes("DAY")
                    ? e.dayOfWeek
                    : e.dayOfWeek + "day"
                  ).toLocaleLowerCase() + "s",
                ) +
                  " " +
                  e.openingTime +
                  " - " +
                  e.closingTime}
              </p>
            );
          })}
        </CellBox>
      );
    },
  },
];

const CellBox = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-white-dark min-h-10 border p-2 text-sm">
      {children}
    </div>
  );
};

export function sentenceCase(a: string) {
  return a && a.length ? a.charAt(0).toLocaleUpperCase() + a.slice(1) : a;
}
