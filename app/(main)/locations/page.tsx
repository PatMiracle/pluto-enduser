"use client";
import { useClientLocations } from "@/services/client-locations";
import {
  AddLocation,
  LocationCard,
  LocationCardSkeleton,
} from "./location-card";
import Footer from "@/components/footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/data-table";
import { dropLocationColumns } from "./dropLocationColumns";
import { useDropLocations } from "@/services/drop-locations";
import { useTrackedLGAs } from "@/services/enum-api";
import { useUserQuery } from "@/services/user-api";
import useOptions from "@/hooks/use-options";

export default function Locations() {
  const [activeTab, setActiveTab] = useState<"pickup" | "dropoff">("pickup");
  const { data: user } = useUserQuery();
  const { data: locations } = useClientLocations();
  const { data: dropOffs, pagination } = useDropLocations(
    { pageSize: 6 },
    true,
  );
  const { data: LGAs } = useTrackedLGAs({
    stateId: user?.stateWasteManagementBoardId!,
  });

  const lgaOptions = [
    {
      label: "All Sites",
      value: undefined,
    },
    ...useOptions(LGAs?.data, "lgaId", "lgaName"),
  ];

  return (
    <div>
      <p className="pl-5 text-lg font-semibold">Locations</p>
      <div className="pt-5 xl:flex xl:w-11/12 xl:gap-5 xl:py-5">
        <div className="px-5 pb-5">
          <div className="flex flex-row gap-4 pb-5">
            <Button
              onClick={() => setActiveTab("pickup")}
              className={cn(
                activeTab !== "pickup" &&
                  "bg-green-light hover:bg-green-light-active text-black",
              )}
            >
              Pickup Sites
            </Button>
            <Button
              onClick={() => setActiveTab("dropoff")}
              className={cn(
                "w-28",
                activeTab !== "dropoff" &&
                  "bg-green-light hover:bg-green-light-active text-black",
              )}
            >
              Dropoff Sites
            </Button>
          </div>
          {activeTab == "pickup" ? (
            <div className="min-h-[50vh] max-w-[790px] pb-10 xl:max-w-full xl:min-w-3xl xl:flex-1 2xl:min-w-4xl">
              <p className="text-white-darker mb-1.5 text-[15px]">
                Manage all Pickup Locations
              </p>
              {locations?.data && locations.data.length == 4 && (
                <p className="text-red-normal mb-4 text-sm">
                  (You have maxed out your 4 Location limit for this Account)
                </p>
              )}
              <div className="grid gap-5 md:grid-cols-2">
                {locations?.data && locations.data.length < 4 && (
                  <AddLocation />
                )}
                {locations
                  ? locations.data.map((v) => (
                      <LocationCard data={v} key={v.clientLocationId} />
                    ))
                  : [1, 2, 3, 4].map((_v, idx) => {
                      return <LocationCardSkeleton key={idx} />;
                    })}
              </div>
            </div>
          ) : (
            <div className="pb-10 xl:min-w-3xl xl:flex-1 2xl:min-w-4xl">
              <div className="pb-3">
                <p className="text-white-darker text-sm">
                  Search for Dropoff Sites Near Your Location
                </p>
              </div>
              <DataTable
                columns={dropLocationColumns}
                data={dropOffs}
                pagination={pagination}
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
