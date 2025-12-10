import { OrderParams } from "@/services/orders";
import { ProductsParams } from "@/services/products";
import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format, startOfYear, subDays, subMonths } from "date-fns";

type Props = {
  activeTab: "orders" | "products";
  productsFilters: Omit<ProductsParams, "pageSize">;
  ordersFilters: Omit<OrderParams, "pageSize">;
  setProductsFilters: Dispatch<
    SetStateAction<Omit<ProductsParams, "pageSize">>
  >;
  setOrdersFilters: Dispatch<SetStateAction<Omit<OrderParams, "pageSize">>>;
  trigger: React.ReactNode;
};

const productsOrdering: ProductsParams["ordering"][] = [
  "PRICE_ASC",
  "PRICE_DESC",
  "NEWEST",
  "OLDEST",
];

const productsStore: ProductsParams["store"][] = [
  "REWARDS",
  "WASTE_MARKET",
  "ALL",
];

const ordersOrdering: OrderParams["ordering"][] = ["DATE_ASC", "DATE_DESC"];

const thirtyDaysAgo = format(subDays(new Date(), 30), "yyyy-MM-dd");
const sixMonthsAgo = format(subMonths(new Date(), 6), "yyyy-MM-dd");
const firstDayOfYear = format(startOfYear(new Date()), "yyyy-MM-dd");

const ordersTime = [
  { text: "Last 30 Days", from: thirtyDaysAgo },
  { text: "Last 6 Months", from: sixMonthsAgo },
  { text: "Current Year", from: firstDayOfYear },
];

export default function RewardsFilter({
  activeTab,
  productsFilters,
  ordersFilters,
  setProductsFilters,
  setOrdersFilters,
  trigger,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="max-w-max" asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-semibold">
          Filter Items
        </DropdownMenuLabel>

        <div className="w-3xs px-2 pt-1">
          {activeTab == "products" ? (
            <>
              <p className="text-white-darker text-sm">Store</p>
              <div className="flex flex-wrap gap-2 pt-1 pb-5">
                {productsStore.map((v) => {
                  const itemSelected = v == productsFilters.store;
                  return (
                    <Button
                      onClick={() => {
                        if (itemSelected)
                          setProductsFilters((p) => ({
                            ...p,
                            store: undefined,
                          }));
                        else setProductsFilters((p) => ({ ...p, store: v }));

                        setOpen(false);
                      }}
                      key={v}
                      variant={itemSelected ? "default" : "outline"}
                      size={"sm"}
                      className="font-normal"
                    >
                      {v}
                    </Button>
                  );
                })}
              </div>
              <p className="text-white-darker text-sm">Ordering</p>
              <div className="flex flex-wrap gap-2 pt-1 pb-5">
                {productsOrdering.map((v) => {
                  const itemSelected = v == productsFilters.ordering;
                  return (
                    <Button
                      onClick={() => {
                        if (itemSelected)
                          setProductsFilters((p) => ({
                            ...p,
                            ordering: undefined,
                          }));
                        else setProductsFilters((p) => ({ ...p, ordering: v }));

                        setOpen(false);
                      }}
                      key={v}
                      variant={itemSelected ? "default" : "outline"}
                      size={"sm"}
                      className="font-normal"
                    >
                      {v}
                    </Button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p className="text-white-darker text-sm">Order Time</p>
              <div className="flex flex-wrap gap-2 pt-1 pb-5">
                {ordersTime.map((v) => {
                  const itemSelected = v.from == ordersFilters.from;
                  return (
                    <Button
                      onClick={() => {
                        if (itemSelected)
                          setOrdersFilters((p) => ({
                            ...p,
                            from: undefined,
                          }));
                        else setOrdersFilters((p) => ({ ...p, from: v.from }));

                        setOpen(false);
                      }}
                      key={v.from}
                      variant={itemSelected ? "default" : "outline"}
                      size={"sm"}
                      className="font-normal"
                    >
                      {v.text}
                    </Button>
                  );
                })}
              </div>
              <p className="text-white-darker text-sm">Ordering</p>
              <div className="flex flex-wrap gap-2 pt-1 pb-5">
                {ordersOrdering.map((v) => {
                  const itemSelected = v == ordersFilters.ordering;
                  return (
                    <Button
                      onClick={() => {
                        if (itemSelected)
                          setOrdersFilters((p) => ({
                            ...p,
                            ordering: undefined,
                          }));
                        else setOrdersFilters((p) => ({ ...p, ordering: v }));

                        setOpen(false);
                      }}
                      key={v}
                      variant={itemSelected ? "default" : "outline"}
                      size={"sm"}
                      className="font-normal"
                    >
                      {v}
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
