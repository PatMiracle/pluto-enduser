"use client";
import { useClientLocations } from "@/services/client-locations";
import {
  AddLocation,
  LocationCard,
  LocationCardSkeleton,
} from "./location-card";
import Footer from "@/components/footer";
import { useState } from "react";

export default function Locations() {
  const [activeTab, setActiveTab] = useState<"pickup" | "dropoff">("pickup");

  const { data: locations } = useClientLocations();

  return (
    <div className="gap-5 pt-5 xl:flex xl:w-11/12 xl:justify-between">
      <div className="grid max-w-[790px] shrink-0 gap-5 px-5 pb-5 md:grid-cols-2 xl:flex-1">
        {locations?.data && locations.data.length < 4 && <AddLocation />}
        {locations
          ? locations.data.map((v) => (
              <LocationCard data={v} key={v.clientLocationId} />
            ))
          : [1, 2, 3, 4].map((_v, idx) => {
              return <LocationCardSkeleton key={idx} />;
            })}
      </div>
      <Footer />
    </div>
  );
}
