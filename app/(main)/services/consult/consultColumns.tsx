"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ticket } from "@/services/ticket";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { getTicketStatusStyle } from "../../help-desk/ticketColumns";

export const consultColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "dateCreated",
    header: "Date Submitted",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <span>{format(v, "d MMM, yyyy")}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Consultation Topic",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      const v = cell.renderValue();
      return (
        <span
          className={cn(
            "block w-16 rounded-sm border py-1 text-center text-[10px] md:text-xs",
            getTicketStatusStyle(v as "CLOSED").style,
          )}
        >
          {getTicketStatusStyle(v as "CLOSED").text}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return (
        <Button
          size={"sm"}
          className="px-5"
          onClick={() => console.log(row.original)}
        >
          View
        </Button>
      );
    },
  },
];
