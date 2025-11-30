import { cn } from "@/lib/utils";
import { ServiceRequest } from "@/services/service-requests-api";
import { format } from "date-fns";
import { getRequestStatusStyle } from "./requestColumns";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";

type Props = {
  data: ServiceRequest;
};

export default function EventPickup({ data }: Props) {
  const editable = data.orderStatus === "NEW" || data.orderStatus === "PENDING";

  return (
    <div className="grid gap-4">
      <div className="flex">
        <Field label="State" value={data.landmark.stateName} />
        <Field label="LGA" value={data.landmark.lgaName} />
      </div>
      <div className="flex">
        <Field label="Landmark" value={data.landmark.landmarkName} />
        <Field label="Postal Code" value={data.landmark.postalCode} />
      </div>
      <div className="flex">
        <Field label="Pickup Date" value={data.startDate} />
        <Field
          label="Date Created"
          value={
            data.dateCreated
              ? format(new Date(data.dateCreated), "d MMM, yyyy")
              : "-"
          }
        />
      </div>
      <div className="flex">
        <Field label="Event Type" value={data.serviceRequestType} />
        <Field label="Contact Number" value={data.contactNumber} />
      </div>
      <div>
        <p className="text-white-darker mb-0.5 text-xs">Email Address</p>
        <p className="lowercase">{data.contactEmail}</p>
      </div>
      <Field label="Pickup Address" value={data.pickupAddress} />
      <Field label="Description" value={data.description} />
      <div>
        <p className="text-white-darker mb-0.5 text-xs">Status:</p>
        <span
          className={cn(
            "block w-16 rounded-sm border py-1 text-center text-[10px] md:text-xs",
            getRequestStatusStyle(data.orderStatus).style,
          )}
        >
          {getRequestStatusStyle(data.orderStatus).text}
        </span>
      </div>
      {editable && (
        <div className="flex items-center justify-between">
          <Button variant={"destructive"}>Cancel Request</Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-green-normal border-green-light-active size-8 rounded-full border"
          >
            <MdEdit />
          </Button>
        </div>
      )}
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div className="mr-4 flex-1">
      <p className="text-white-darker mb-0.5 text-xs">{label}</p>
      <p className="capitalize">{value}</p>
    </div>
  );
}
