import { ServiceRequest } from "@/services/service-requests-api";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type StatusType = ServiceRequest["orderStatus"];

type Props = {
  setOrderStatus: React.Dispatch<React.SetStateAction<StatusType | undefined>>;
  orderStatus: StatusType | undefined;
  trigger: React.ReactNode;
};

const statusTypes: StatusType[] = [
  "NEW",
  "COMPLETED",
  "CANCELLED",
  "OVER_DUE",
  "CLIENT_CANCELLED",
];

export default function RequestFilter({
  orderStatus,
  setOrderStatus,
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
          <p className="text-white-darker text-sm">Status</p>
          <div className="flex flex-wrap gap-2 pt-1 pb-5">
            {statusTypes.map((v) => {
              const itemSelected = v == orderStatus;
              return (
                <Button
                  onClick={() => {
                    if (itemSelected) setOrderStatus(undefined);
                    else setOrderStatus(v);

                    setOpen(false);
                  }}
                  key={v}
                  variant={itemSelected ? "default" : "outline"}
                  size={"sm"}
                  className="font-normal"
                >
                  {v == "CANCELLED"
                    ? "DECLINED"
                    : v == "CLIENT_CANCELLED"
                      ? "CANCELLED"
                      : v}
                </Button>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
