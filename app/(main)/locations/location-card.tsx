import { ClientLocation } from "@/services/client-locations";
import { MdAddCircleOutline, MdOutlineInfo } from "react-icons/md";

export function AddLocation() {
  return (
    <button className="border-white-dark min-h-[200px] w-full flex-1 rounded-2xl border p-4">
      <div className="border-green-normal bg-green-light flex min-h-full w-full flex-col items-center justify-center gap-1.5 rounded-2xl border">
        <MdAddCircleOutline className="text-green-normal" />
        <p className="text-xs">Click to add a pickup location</p>
        <div className="text-white-darker flex items-center gap-1">
          <MdOutlineInfo size={14} />
          <p className="text-[10px]">Maximum: 4 Locations per account</p>
        </div>
      </div>
    </button>
  );
}

type LocationCardProps = { data: ClientLocation[] };

export function LocationCard({ data }: LocationCardProps) {
  return <div>LocationCard</div>;
}
