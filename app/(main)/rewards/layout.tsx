import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function RewardsLayout({ children }: Props) {
  return (
    <div className="px-5">
      <p className="text-lg font-semibold">Reward & Discount</p>
      {children}
    </div>
  );
}
