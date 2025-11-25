import React from "react";

export interface StatCardProps {
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

export default StatCard;
