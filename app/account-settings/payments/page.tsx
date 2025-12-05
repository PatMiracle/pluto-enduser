"use client";
import { DataTable } from "@/components/data-table";
import { cn } from "@/lib/utils";
import { usePayments } from "@/services/payments";
import { useState } from "react";
import { historyColumns } from "./historyColumns";
import Billing from "./Billing";

const Payment = () => {
  const [activeTab, setActiveTab] = useState<"billing" | "history">("billing");
  const { data: payments, pagination } = usePayments({ pageSize: 10 });

  return (
    <div className="pb-5">
      <p className="ml-5 text-lg">Account & Payment</p>

      {/* tab controller */}
      <div className="mt-5 flex gap-6 border-b border-b-[#E5E7EB] pl-5">
        <div className="flex flex-col">
          <button
            onClick={() => setActiveTab("billing")}
            className={cn(
              activeTab !== "billing" &&
                "text-white-dark hover:text-white-darker",
              "text-sm",
            )}
          >
            Billing
          </button>
          <span
            className={cn(
              activeTab == "billing" && "bg-green-normal",
              "mt-1 h-1 w-full rounded-t-md",
            )}
          ></span>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              activeTab !== "history" &&
                "text-white-dark hover:text-white-darker",
              "text-sm",
            )}
          >
            History
          </button>
          <span
            className={cn(
              activeTab == "history" && "bg-green-normal",
              "mt-1 h-1 w-full rounded-t-md",
            )}
          ></span>
        </div>
      </div>

      {/*  */}
      {activeTab == "billing" ? (
        <Billing />
      ) : (
        <div className="grid gap-4 p-5">
          <p>Payment History</p>
          <DataTable
            columns={historyColumns}
            data={payments}
            pagination={pagination}
          />
        </div>
      )}
    </div>
  );
};

export default Payment;
