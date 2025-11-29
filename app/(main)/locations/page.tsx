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

export default function Locations() {
  const [activeTab, setActiveTab] = useState<"pickup" | "dropoff">("pickup");

  const { data: locations } = useClientLocations();

  return (
    <div>
      <div className="pl-5">
        <p className="text-lg">Locations</p>
        <div className="flex flex-row gap-4 pt-5">
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
      </div>

      <div className="pt-5 xl:flex xl:w-11/12 xl:gap-5">
        {activeTab == "pickup" ? (
          <div className="max-w-5xl px-5 pb-10 xl:flex-1">
            <p className="text-white-darker mb-1.5 text-[15px]">
              Manage all Pickup Locations
            </p>
            {locations?.data && locations.data.length == 4 && (
              <p className="text-red-normal mb-2 text-sm">
                (You have maxed out your 4 Location limit for this Account)
              </p>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              {locations?.data && locations.data.length < 4 && <AddLocation />}
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
          <></>
        )}
        <Footer />
      </div>
    </div>
  );
}
