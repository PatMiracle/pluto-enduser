import { DataTable, TableSkeleton } from "@/components/data-table";
import { useTickets } from "@/services/ticket";
import React from "react";
import { ticketColumns } from "./columns";

type Props = {};

export default function MyTickets({}: Props) {
  const { data: tickets, isPending } = useTickets({ pageSize: 10 });

  return (
    <div className="py-5">
      {tickets ? (
        <DataTable columns={ticketColumns} data={tickets?.data} />
      ) : (
        <TableSkeleton rows={8} />
      )}
    </div>
  );
}
