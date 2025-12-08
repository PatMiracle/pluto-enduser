"use client";

import { useDashboard } from "@/services/dashboard-api";
import { PointCard } from "../dashboard/stat-cards";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarketCard, RewardCard } from "./reward-card";
import { useProducts } from "@/services/products";
import { useOrders } from "@/services/orders";
import { useSidebar } from "@/components/ui/sidebar";

const Rewards = () => {
  const { data: dashboardData } = useDashboard();

  const [activeTab, setActiveTab] = useState<"reward-market" | "my-rewards">(
    "reward-market",
  );

  const { data: products } = useProducts();
  const { data: orders } = useOrders();

  const { open: sidebarOpen } = useSidebar();

  return (
    <div className="px-5">
      <p className="text-lg font-semibold">Reward & Discount</p>
      <div className="pt-5 lg:max-w-52">
        <PointCard pointsEarned={dashboardData?.pointsEarned || +""} />
      </div>
      <div className="flex flex-row gap-4 pt-5">
        <Button
          onClick={() => setActiveTab("reward-market")}
          className={cn(
            activeTab !== "reward-market" &&
              "bg-green-light hover:bg-green-light-active text-black",
          )}
        >
          Reward Market
        </Button>
        <Button
          onClick={() => setActiveTab("my-rewards")}
          className={cn(
            "w-28",
            activeTab !== "my-rewards" &&
              "bg-green-light hover:bg-green-light-active text-black",
          )}
        >
          My Rewards
        </Button>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-4 py-6",
          !sidebarOpen && "md:grid-cols-3",
        )}
      >
        {activeTab == "reward-market" &&
          products?.map((p) => <MarketCard product={p} key={p.productId} />)}
        {activeTab == "my-rewards" &&
          orders?.map((d) => <RewardCard data={d} key={d.orderCode} />)}
      </div>
    </div>
  );
};

export default Rewards;
