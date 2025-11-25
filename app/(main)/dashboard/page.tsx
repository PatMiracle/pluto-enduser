import StatCard from "@/components/dashboard/stat-card";
import { MdOutlineLocationOn } from "react-icons/md";

const dummyData = {
  locations: {
    value: 4,
  },
  requests: {
    value: 127,
    percentageIncrease: "+12.5%",
  },
};

export default async function Dashboard() {
  return (
    <div className="grid max-w-2xl grid-cols-2 gap-3 px-5 py-4 lg:gap-5">
      <StatCard
        title="Locations"
        value={dummyData?.locations?.value || 0}
        subtitle="Total Registered"
        icon={<MdOutlineLocationOn />}
      />
      <StatCard
        title="Locations"
        value={dummyData?.locations?.value || 0}
        subtitle="Total Registered"
        icon={<MdOutlineLocationOn />}
      />
      <StatCard
        title="Locations"
        value={dummyData?.locations?.value || 0}
        subtitle="Total Registered"
        icon={<MdOutlineLocationOn />}
      />
      <StatCard
        title="Locations"
        value={dummyData?.locations?.value || 0}
        subtitle="Total Registered"
        icon={<MdOutlineLocationOn />}
      />
    </div>
  );
}
