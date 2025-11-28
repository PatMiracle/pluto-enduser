import { DashboardData } from "@/services/dashboard-api";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlineLocationOn, MdStorefront } from "react-icons/md";
import Image from "next/image";
import orderInactiveIcon from "@/public/icons/orders-inactive.svg";

type Props = {
  data: DashboardData | undefined;
};

export default function StatCards({ data }: Props) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-4">
      {data ? (
        <>
          <StatCard
            title="Location"
            value={data.locations.value}
            subtitle="Total Registered"
            icon={<MdOutlineLocationOn />}
          />
          <StatCard
            title="Requests"
            value={data.requests.value}
            subtitle="Total Requested"
            icon={<Image src={orderInactiveIcon} alt="" />}
          />
          <StatCard
            title="Rewards"
            value={data.orders.value}
            subtitle="Total Claimed"
            icon={<MdStorefront />}
          />
          <PointCard pointsEarned={data.pointsEarned} />
        </>
      ) : (
        Array.from({ length: 4 }).map((_, j) => <StatSkeleton key={j} />)
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => {
  return (
    <div className="border-white-dark relative flex flex-1 flex-col justify-between rounded-lg border p-4">
      <div className="mb-2 flex flex-row gap-2.5">
        {/* Green rectangle bar */}
        <div className="bg-green-normal h-full w-[5px] rounded-[5px]" />

        {/* Title and value */}
        <div>
          <p className="text-white-darker text-[15px]">{title}</p>
          <p className="text-[30px] font-bold text-black">{value}</p>
        </div>

        {/* Icon wrapper */}
        <div className="bg-green-light text-green-normal ml-auto flex h-[33px] w-[33px] items-center justify-center rounded-[5px] text-2xl">
          {icon}
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-white-darker text-xs">{subtitle}</p>
    </div>
  );
};

const PointCard = ({ pointsEarned }: { pointsEarned: number }) => {
  return (
    <div className="bg-black-normal relative flex flex-1 flex-col justify-between rounded-lg border p-4">
      <p className="text-white-normal text-[15px]">Points Earned</p>
      <p className="text-white-normal text-3xl">{pointsEarned}</p>
    </div>
  );
};

const StatSkeleton = () => {
  return (
    <div className="border-white-dark relative flex flex-1 flex-col justify-between rounded-lg border p-4">
      <div className="mb-2 flex flex-row gap-2.5">
        <Skeleton className="bg-green-light-hover h-full w-[5px] rounded-[5px]" />
        <div>
          <Skeleton className="h-2 w-16" />
        </div>
        <Skeleton className="bg-green-light ml-auto h-[33px] w-[33px] rounded-[5px]"></Skeleton>
      </div>
      <Skeleton className="h-2 w-10" />
    </div>
  );
};
