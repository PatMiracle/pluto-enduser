"use client";

import { cn } from "@/lib/utils";
import { DropLocation } from "@/services/drop-locations";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export const requestColumns: ColumnDef<DropLocation>[] = [
  {
    accessorKey: "dropLocationId",
    header: "Contact",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <span></span>;
    },
  },
  {
    accessorKey: "dropOffStreetAddress",
    header: "Location Address",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <div>{v}</div>;
    },
  },
  {
    accessorKey: "collectionTypeName",
    header: "Collection Type",
  },
  {
    accessorKey: "openingHours",
    header: "Operation Hours",
  },
];

const CellBox = ({ children }: { children: ReactNode }) => {
  <div></div>;
};
