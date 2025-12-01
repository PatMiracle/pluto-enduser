"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import QueryTickets from "./query-tickets";
import { DataTable } from "@/components/data-table";
import { useTickets } from "@/services/ticket";
import { ticketColumns } from "./ticketColumns";

export default function HelpDesk() {
  const [activeTab, setActiveTab] = useState<"query-ticket" | "my-tickets">(
    "query-ticket",
  );

  const { data: tickets } = useTickets({ pageSize: 10 });

  return (
    <div className="px-5">
      <p className="text-lg font-semibold">Help Desk</p>
      <div className="flex flex-row gap-4 pt-5">
        <Button
          onClick={() => setActiveTab("query-ticket")}
          className={cn(
            activeTab !== "query-ticket" &&
              "bg-green-light hover:bg-green-light-active text-black",
          )}
        >
          Query Tickets
        </Button>
        <Button
          onClick={() => setActiveTab("my-tickets")}
          className={cn(
            "w-28",
            activeTab !== "my-tickets" &&
              "bg-green-light hover:bg-green-light-active text-black",
          )}
        >
          My Tickets
        </Button>
      </div>
      <div className="py-6">
        {activeTab == "query-ticket" ? (
          <QueryTickets />
        ) : (
          <DataTable columns={ticketColumns} data={tickets?.data} />
        )}
      </div>
    </div>
  );
}
