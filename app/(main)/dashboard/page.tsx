"use client";

import { useCalenderEvents } from "@/services/calendar-events-api";
import { useDashboard } from "@/services/dashboard-api";
import { useServiceRequests } from "@/services/service-requests-api";
import { useUserQuery } from "@/services/user-api";

export default function Dashboard() {
  const { data: user } = useUserQuery();
  const { data: dashboardData } = useDashboard();
  const { data: calenderEvents } = useCalenderEvents({ pageSize: 9 });
  const { data: serviceRequests } = useServiceRequests({ pageSize: 7 });

  return (
    <div className="grid max-w-2xl grid-cols-2 gap-3 px-5 py-4 lg:gap-5"></div>
  );
}
