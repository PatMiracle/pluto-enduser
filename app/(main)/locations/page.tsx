"use client";
import { useClientLocations } from "@/services/client-locations";
import {
  AddLocation,
  LocationCard,
  LocationCardSkeleton,
} from "./location-card";

export default function Locations() {
  const { data: locations } = useClientLocations();

  return (
    <div className="">
      <div className="grid max-w-3xl gap-5 p-5 md:grid-cols-2">
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
  );
}
