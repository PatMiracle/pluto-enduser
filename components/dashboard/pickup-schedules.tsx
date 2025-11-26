import { CalendarEvent } from "@/services/calendar-events-api";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { MdChevronLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  data: CalendarEvent[] | undefined;
};

export default function PickupSchedules({ data }: Props) {
  function chunkArray() {
    if (!Array.isArray(data)) return []; // safety check

    const result = [];
    for (let i = 0; i < data.length; i += 2) {
      result.push(data.slice(i, i + 2));
    }
    return result;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const chunks = chunkArray();

  // update currentIndex every 3second
  useEffect(() => {
    if (chunks.length <= 1) return; // no need to rotate if 1 or 0 chunks

    const changeIdx = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= chunks.length ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(changeIdx);
  }, [chunks.length]);

  return (
    <div className="flex w-full flex-col">
      <div className="border-white-dark rounded-lg border px-3 py-4">
        <h2 className="text-white-darker text-lg font-medium">
          Pickup Schedule
        </h2>

        {!data ? (
          <PickupItemsSkeleton />
        ) : data.length === 0 ? (
          <p className="text-white-darker mt-2.5 text-sm">
            No pickup schedules...
          </p>
        ) : (
          <PickupItems data={chunks[currentIndex]} />
        )}

        <Link
          href="/pickup-schedules"
          className="mt-2.5 ml-auto block text-right text-base underline"
        >
          View all
        </Link>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1">
        {chunks.length > 1 && (
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
          >
            <MdChevronLeft
              size={18}
              className={cn(
                currentIndex === 0 ? "text-white-dark" : "text-black-normal",
              )}
            />
          </button>
        )}

        <span className="flex gap-1">
          {chunks.map((_, j) => (
            <button
              key={j}
              onClick={() => setCurrentIndex(j)}
              className={cn(
                "h-1 w-1 rounded",
                j === currentIndex ? "bg-green-500" : "bg-white-dark",
              )}
            />
          ))}
        </span>

        {chunks.length > 1 && (
          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(prev + 1, chunks.length - 1))
            }
            disabled={currentIndex >= chunks.length - 1}
          >
            <MdKeyboardArrowRight
              size={18}
              className={cn(
                currentIndex >= chunks.length - 1
                  ? "text-white-dark"
                  : "text-black-normal",
              )}
            />
          </button>
        )}
      </div>
    </div>
  );
}

const PickupItems = ({ data }: { data: CalendarEvent[] }) => {
  return (
    <div className="space-y-2.5 py-5">
      {data?.map(({ startDateTime, eventId, landmark }) => (
        <div key={eventId} className="flex items-center gap-4">
          <div className="min-w-10 text-center">
            <div className="text-sm">{formatDate(startDateTime, "EEE")}</div>
            <div className="text-sm">{formatDate(startDateTime, "do")}</div>
          </div>
          <div className="bg-green-normal flex flex-1 items-center gap-2.5 rounded-lg px-3 py-2.5">
            <div className="bg-white-normal flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <svg
                className="text-green-normal h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 18.5a1.5 1.5 0 0 1-1 1.5H3a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 3 8h14a1.5 1.5 0 0 1 1.5 1.5v9h.5zm-1-9H3v9h14v-9zm5-4v9a1.5 1.5 0 0 1-1.5 1.5H20v-9h.5zm-2-1H19V4a1.5 1.5 0 0 0-1.5-1.5h-14A1.5 1.5 0 0 0 2 4v.5h18z" />
              </svg>
            </div>
            <span className="text-white-normal text-sm font-medium">
              {landmark.landmarkName} Pickup
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const PickupItemsSkeleton = () => {
  return (
    <div className="space-y-2.5 py-5">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="min-w-10 space-y-1 text-center">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="bg-white-dark flex flex-1 items-center gap-2.5 rounded-lg px-3 py-2.5">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        </div>
      ))}
    </div>
  );
};
