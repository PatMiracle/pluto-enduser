import { Ticket } from "@/services/ticket";
import { getTicketStatusStyle } from "./ticketColumns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

type Props = {
  data: Ticket;
};

export default function TicketReport({ data }: Props) {
  const [showQuery, setShowQuery] = useState(false);
  return (
    <div>
      <span
        className={cn(
          "block w-16 rounded-sm border py-1 text-center text-[10px] md:text-xs",
          getTicketStatusStyle(data.status as "CLOSED").style,
        )}
      >
        {getTicketStatusStyle(data.status as "CLOSED").text}
      </span>

      <div className="grid gap-3 py-5">
        <div className="border-white-dark rounded-lg border px-3 py-2">
          <p className="text-[15px]">Requestor Information</p>
          <div className="grid grid-cols-2 gap-2">
            <ReportField label="First Name" value={data.firstName} />
            <ReportField label="Last Name" value={data.lastName} />
            <ReportField label="Email" value={data.email} />
            <ReportField label="Phone Number" value={data.phoneNumber} />
          </div>
          <div className="border-white-dark my-1 rounded-lg border px-3 py-2">
            <button
              className="flex w-full items-center justify-between"
              onClick={() => setShowQuery(!showQuery)}
            >
              <span className="text-sm">Query</span>
              <MdKeyboardArrowDown
                size={20}
                className={cn(showQuery && "rotate-180", "duration-300")}
              />
            </button>
            {showQuery && (
              <p className="text-white-darker mt-2 text-sm">
                {data.description}
              </p>
            )}
          </div>
        </div>
        {(data.status == "CLOSED" || data.status == "RESOLVED") && (
          <div className="border-white-dark rounded-lg border px-3 py-2">
            <p className="text-[15px]">Triage / Resolution</p>
            <div className="grid grid-cols-2 gap-2">
              <ReportField
                label="Reporter was contacted"
                value={
                  data?.resolution?.reporterContacted == null
                    ? "N/A"
                    : data?.resolution?.reporterContacted
                      ? "Yes"
                      : "No"
                }
              />
              <ReportField
                label="Issue Resolved"
                value={data?.status === "RESOLVED" ? "Yes" : "No"}
              />
              <ReportField
                label="Channel"
                value={data?.resolution?.meansOfContact ?? "- -"}
              />
            </div>
            <ReportField
              label="Resolution Action Taken"
              value={data?.resolution?.resolutionActionTaken ?? "- -"}
            />
          </div>
        )}

        {data?.images?.length > 0 && (
          <div className="flex flex-wrap gap-2 py-2">
            {data.images.map((e) => (
              <Image
                src={e.imageURL}
                alt={e.description}
                width={200}
                height={200}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReportField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="py-2 text-xs sm:text-sm">
      <p className="text-white-dark">{label}</p>
      <p>{value}</p>
    </div>
  );
}
