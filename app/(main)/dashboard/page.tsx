"use client";

import Footer from "@/components/footer";
import PickupSchedules from "@/app/(main)/dashboard/pickup-schedules";
import StatCards from "@/app/(main)/dashboard/stat-cards";
import { useCalenderEvents } from "@/services/calendar-events-api";
import { useDashboard } from "@/services/dashboard-api";
import { useServiceRequests } from "@/services/service-requests-api";
import { useUserQuery } from "@/services/user-api";
import { DataTable, TableSkeleton } from "@/components/data-table";
import { requestColumns } from "../requests/requestColumns";
import Link from "next/link";

export default function Dashboard() {
  const { data: user } = useUserQuery();
  const { data: dashboardData } = useDashboard();
  const { data: calenderEvents } = useCalenderEvents({ pageSize: 9 });
  const { data: serviceRequests } = useServiceRequests({ pageSize: 7 });

  return (
    <>
      <div className="gap-4 px-5">
        <p className="text-lg">
          Welcome Back, {user?.firstName} {user?.lastName}!
        </p>
        <div className="flex flex-col gap-4 py-5 lg:flex-row">
          <section className="w-full lg:max-w-[60%]">
            <StatCards data={dashboardData} />
          </section>
          <section className="lg:max-[40%] flex-1">
            <PickupSchedules data={calenderEvents?.data} />
          </section>
        </div>
      </div>
      <div className="flex flex-col xl:mx-5 xl:flex-row xl:gap-4 xl:pb-6">
        <section className="xl:w-full">
          <div className="border-white-dark m-5 grid gap-4 rounded-lg border p-5 xl:m-0">
            <p>Requests & Special Orders</p>
            <DataTable columns={requestColumns} data={serviceRequests?.data} />
            <Link
              href="/requests"
              className="mt-2.5 ml-auto block self-end text-right text-base underline"
            >
              View all
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
