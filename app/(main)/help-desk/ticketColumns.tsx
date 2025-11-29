"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ticket } from "@/services/ticket";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const ticketColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticketId",
    header: "Ticket ID",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <span>#{v}</span>;
    },
  },
  {
    accessorKey: "dateCreated",
    header: "Date Submitted",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <span>{format(v, "d MMM, yyyy")}</span>;
    },
  },
  {
    accessorKey: "issueType.issueTypeName",
    header: "Ticket Category",
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
    accessorKey: "description",
    header: "Summary",
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

export const getTicketStatusStyle = (status: Ticket["status"]) => {
  switch (status) {
    case "PENDING":
      return {
        style: "border-[#FFA500] text-[#FFA500] bg-[#FFA50020]",
        text: "Pending",
      };
    case "UNDER_REVIEW":
      return {
        style: "border-[#FFA500] text-[#FFA500] bg-[#FFA50020]",
        text: "Under Review",
      };
    case "CLOSED":
      return {
        style: "border-[#1155CC] text-[#1155CC] bg-[#1155CC20]",
        text: "Closed",
      };
    case "RESOLVED":
      return {
        style: "border-green-normal text-green-normal bg-[#319D3820]",
        text: "Resolved",
      };
    default:
      return {
        style: "border-white-darker text-white-darker bg-[#59595820]",
        text: status,
      };
  }
};
