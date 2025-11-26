"use client";

import StatCards from "@/components/dashboard/stat-cards";
import { useCalenderEvents } from "@/services/calendar-events-api";
import { useDashboard } from "@/services/dashboard-api";
import { useServiceRequests } from "@/services/service-requests-api";
import { useUserQuery } from "@/services/user-api";
import useAuthStore from "@/store/AuthStore";

export default function Dashboard() {
  const { data: user } = useUserQuery();
  const { data: dashboardData } = useDashboard();
  const { data: calenderEvents } = useCalenderEvents({ pageSize: 9 });
  const { data: serviceRequests } = useServiceRequests({ pageSize: 7 });

  return (
    <div className="gap-4 p-4">
      <p className="text-lg">
        Welcome Back, {user?.firstName} {user?.lastName}!
      </p>
      <div className="flex flex-row py-4">
        <div className="w-full lg:max-w-2xl">
          <StatCards data={dashboardData} />
        </div>
      </div>
    </div>
  );
}
