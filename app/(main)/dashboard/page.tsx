"use client";

import Footer from "@/components/dashboard/footer";
import PickupSchedules from "@/components/dashboard/pickup-schedules";
import StatCards from "@/components/dashboard/stat-cards";
import { useCalenderEvents } from "@/services/calendar-events-api";
import { useDashboard } from "@/services/dashboard-api";
import { useServiceRequests } from "@/services/service-requests-api";
import { useUserQuery } from "@/services/user-api";
import { DataTable } from "@/components/data-table";
import { requestColumns } from "../requests/columns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: user } = useUserQuery();
  const { data: dashboardData } = useDashboard();
  const { data: calenderEvents } = useCalenderEvents({ pageSize: 9 });
  const { data: serviceRequests } = useServiceRequests({ pageSize: 7 });

  return (
    <>
      <div className="gap-4 p-4">
        <p className="text-lg">
          Welcome Back, {user?.firstName} {user?.lastName}!
        </p>
        <div className="flex flex-col gap-4 py-4 lg:flex-row">
          <section className="w-full lg:max-w-[60%]">
            <StatCards data={dashboardData} />
          </section>
          <section className="lg:max-[40%] flex-1">
            <PickupSchedules data={calenderEvents?.data} />
          </section>
        </div>

        <section className="border-white-dark grid gap-4 rounded-lg border px-4 py-5">
          <p>Requests & Special Orders</p>
          {serviceRequests ? (
            <DataTable columns={requestColumns} data={serviceRequests?.data} />
          ) : (
            <div className="grid gap-4">
              {Array.from({ length: 8 }).map((_, j) => (
                <Skeleton key={j} className="bg-white-normal-hover h-10" />
              ))}
            </div>
          )}
          <Link
            href="/requests"
            className="mt-2.5 ml-auto block self-end text-right text-base underline"
          >
            View all
          </Link>
        </section>
        {/*  */}
      </div>
      <Footer />
    </>
  );
}
