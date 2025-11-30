"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ServiceRequest } from "@/services/service-requests-api";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import EventPickup from "./EventPickup";

export const requestColumns: ColumnDef<ServiceRequest>[] = [
  {
    accessorKey: "startDate",
    header: "Pickup Date",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <span>{format(v, "d MMM, yyyy")} </span>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ cell }) => {
      const v = cell.renderValue();
      return (
        <span
          className={cn(
            "block w-16 rounded-sm border py-1 text-center text-[10px] md:text-xs",
            getRequestStatusStyle(v as "NEW").style,
          )}
        >
          {getRequestStatusStyle(v as "NEW").text}
        </span>
      );
    },
  },
  {
    accessorKey: "pickupAddress",
    header: "Target Location",
  },
  {
    accessorKey: "serviceRequestType",
    header: "Service Type",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return (
        <Modal
          trigger={
            <Button size={"sm"} className="px-5">
              View
            </Button>
          }
          title="Event Pickup Request Details"
        >
          <EventPickup data={row.original} />
        </Modal>
      );
    },
  },
];

export const getRequestStatusStyle = (
  status: ServiceRequest["orderStatus"],
) => {
  switch (status) {
    case "NEW":
      return {
        style: "border-[#1d4ed8] text-[#1d4ed8] bg-[#1d4ed820]",
        text: "New",
      };
    case "PENDING":
      return {
        style: "border-[#FFA500] text-[#FFA500] bg-[#FFA50020]",
        text: "Under Review",
      };
    case "APPROVED":
      return {
        style: "border-[#1155CC] text-[#1155CC] bg-[#1155CC20]",
        text: "Approved",
      };
    case "COMPLETED":
      return {
        style: "border-green-normal text-green-normal bg-[#319D3820]",
        text: "Completed",
      };
    case "CANCELLED":
    case "CLIENT_CANCELLED":
      return {
        style: "border-[#D72323] text-[#D72323] bg-[#D7232320]",
        text: "Cancelled",
      };
    case "OVER_DUE":
      return {
        style: "border-white-darker text-white-darker bg-[#59595820]",
        text: "Overdue",
      };
    default:
      return {
        style: "border-white-darker text-white-darker bg-[#59595820]",
        text: status,
      };
  }
};
