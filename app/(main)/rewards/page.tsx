"use client";

import { useDashboard } from "@/services/dashboard-api";
import { PointCard } from "../dashboard/stat-cards";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarketCard, MarketCardSkeleton, RewardCard } from "./reward-card";
import { ProductsParams, useProducts } from "@/services/products";
import { OrderParams, useOrders } from "@/services/orders";
import { useSidebar } from "@/components/ui/sidebar";
import { FaSliders } from "react-icons/fa6";
import RewardsFilter from "./rewards-filter";

const Rewards = () => {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [productsFilters, setProductsFilters] = useState<
    Omit<ProductsParams, "pageSize">
  >({});
  const [ordersFilters, setOrdersFilters] = useState<
    Omit<OrderParams, "pageSize">
  >({});

  const { data: products } = useProducts(productsFilters);
  const { data: orders } = useOrders(ordersFilters);
  const { data: dashboardData } = useDashboard();
  const { open: sidebarOpen } = useSidebar();

  return (
    <>
      <div className="pt-5 lg:max-w-52">
        <PointCard pointsEarned={dashboardData?.pointsEarned || +""} />
      </div>
      <div className="flex flex-row gap-4 pt-5">
        <Button
          onClick={() => setActiveTab("products")}
          className={cn(
            activeTab !== "products" &&
              "bg-green-light hover:bg-green-light-active text-black",
          )}
        >
          Reward Market
        </Button>
        <Button
          onClick={() => setActiveTab("orders")}
          className={cn(
            "w-28",
            activeTab !== "orders" &&
              "bg-green-light hover:bg-green-light-active text-black",
          )}
        >
          My Rewards
        </Button>
        <RewardsFilter
          activeTab={activeTab}
          ordersFilters={ordersFilters}
          productsFilters={productsFilters}
          setOrdersFilters={setOrdersFilters}
          setProductsFilters={setProductsFilters}
          trigger={
            <button className="text-primary">
              <FaSliders size={16} />
            </button>
          }
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-2 gap-4 py-6 xl:grid-cols-3",
          !sidebarOpen && "md:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {activeTab === "products"
          ? products
            ? products.map((p) => <MarketCard product={p} key={p.productId} />)
            : Array.from({ length: 6 }).map((_, i) => (
                <MarketCardSkeleton key={i} />
              ))
          : null}
        {activeTab === "orders"
          ? orders
            ? orders.map((d) => <RewardCard data={d} key={d.orderCode} />)
            : Array.from({ length: 6 }).map((_, i) => (
                <MarketCardSkeleton key={i} />
              ))
          : null}
      </div>
      {activeTab == "orders" && orders?.length == 0 && (
        <p className="text-center">
          You have not redeemed any rewards{" "}
          {ordersFilters.from ? "from the selected period." : "yet."}
        </p>
      )}
      {activeTab == "products" && products?.length == 0 && (
        <p className="text-center">No products.</p>
      )}
    </>
  );
};

export default Rewards;
