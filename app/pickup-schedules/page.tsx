"use client";

export const dynamic = "force-dynamic";

import { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MdChevronLeft,
  MdChevronRight,
  MdInfo,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import {
  addMonths,
  endOfMonth,
  format,
  formatDate,
  startOfMonth,
} from "date-fns";
import { cn } from "@/lib/utils";
import GreenTruck from "@/public/green-truck";
import YellowTruck from "@/public/yellow-truck";
import BlueTruck from "@/public/blue-truck";
import {
  CalendarEvent,
  useCalenderEvents,
} from "@/services/calendar-events-api";
import { useClientLocations } from "@/services/client-locations";

const PickupSchedules = () => {
//  const searchParams = useSearchParams();
 // const id = searchParams.get("id");

  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const eventDetailsRef = useRef<HTMLDivElement>(null);

  const { data: events } = useCalenderEvents({
    from: format(startOfMonth(currentDate), "yyyy-MM-dd"),
    to: format(endOfMonth(currentDate), "yyyy-MM-dd"),
   // dropLocationId: id ? +id : undefined,
  });

  const id = 0;
  const { data: locations } = useClientLocations(
    { clientLocationId: id ? +id : undefined },
    { enabled: !!id },
  );

  const currentDateEvents = events?.filter(
    (e) =>
      format(e.startDateTime, "yyyy-MM-dd") ==
      format(currentDate, "yyyy-MM-dd"),
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const headers = weekDays.map((day) => (
      <div key={day} className="text-white-darker py-3 text-center text-sm">
        {day}
      </div>
    ));

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="min-h-16 cursor-pointer border border-gray-200"
        />,
      );
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isTodayCell = isToday(day);
      const isSelectedDate = currentDate.getDate() == day;
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );

      const dayEvents = events?.filter(
        (e) =>
          format(e.startDateTime, "yyyy-MM-dd") == format(date, "yyyy-MM-dd"),
      );

      days.push(
        <button
          key={day}
          onClick={() => {
            setCurrentDate(date);
            eventDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          className={cn(
            "bg-white-normal flex min-h-16 flex-col items-center justify-center border border-gray-200 p-2",
            isTodayCell && "text-primary",
            isSelectedDate && "bg-green-light text-primary",
          )}
        >
          <span
            className={cn(
              "mb-1 text-sm font-medium",
              isTodayCell ? "text-primary" : "text-gray-700",
              isSelectedDate && "text-primary",
            )}
          >
            {day}
          </span>
          <span className="flex flex-wrap items-center justify-center gap-0.5">
            {dayEvents &&
              dayEvents?.[0] &&
              (dayEvents?.[0]?.eventType == "pickup" ? (
                <GreenTruck className="size-4" />
              ) : (
                <YellowTruck className="size-4" />
              ))}
            {dayEvents && dayEvents?.length > 0 && (
              <span className="hidden bg-[#f8f9fa] px-2 py-1 text-[11px] lg:inline">
                {dayEvents.length}{" "}
                <span>Event{dayEvents.length > 1 && "s"}</span>
              </span>
            )}
          </span>
        </button>,
      );
    }

    return (
      <div className="mb-6 overflow-hidden">
        {id && (
          <p className="mb-2 text-xl">
            Pickup Schedule for: {locations && locations.data[0]?.address}
          </p>
        )}
        <p>{format(currentDate, "EEE, MMM d")}</p>
        <p className="bg-red-light text-red-normal my-2 flex items-start gap-1 rounded-md px-3 py-2 text-sm sm:items-center">
          <MdInfo className="shrink-0" />
          Services are moved a day due to holiday, as indicated by the coloured
          boxes
        </p>
        <div className="flex items-center justify-between py-3">
          <button className="flex items-center gap-1">
            <span>{format(currentDate, "MMMM yyyy")}</span>
            <MdKeyboardArrowDown size={24} />
          </button>
          <div className="flex items-center gap-2.5">
            <button onClick={goToPreviousMonth}>
              <MdChevronLeft size={24} />
            </button>
            <button onClick={() => setCurrentDate(new Date())}>Now</button>
            <button onClick={goToNextMonth}>
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-7 border-t">{headers}</div>
          <div className="grid grid-cols-7 bg-[#f8f9fa]">{days}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div
        className="bg-white-normal fixed top-0 z-50 flex h-14 w-full items-center gap-2 px-5"
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      >
        <button onClick={() => router.back()}>
          <MdKeyboardArrowLeft size={28} className="text-primary" />
        </button>
        <h1 className="text-lg font-bold">Pickup Schedules</h1>
      </div>

      <div className="relative mt-14 px-6 lg:flex lg:flex-row-reverse lg:py-0">
        <div className="lg: flex-1 py-6 lg:absolute lg:left-[305px] lg:w-[calc(100%-324px)] lg:pl-5">
          {renderCalendar()}
          <div className="rounded-lg bg-[#f8f9fa] p-4" ref={eventDetailsRef}>
            <p className="mb-2 text-sm text-[#333]">
              Events for {format(currentDate, "MMM d, yyyy")}
            </p>

            {currentDateEvents && currentDateEvents.length == 0 ? (
              <p className="text-center text-sm text-[#999] italic">
                No events scheduled
              </p>
            ) : (
              currentDateEvents?.map((e) => (
                <EventItem event={e} key={e.eventId} />
              ))
            )}
          </div>
        </div>

        <div className="bg-white-normal pt-6 pr-5 lg:fixed lg:top-0 lg:left-0 lg:h-full lg:w-[305px] lg:border-r lg:px-5">
          <h2 className="text-white-darker mb-6 text-xl">Legend</h2>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <GreenTruck className="size-6" />
                <span>Garbage Pickup</span>
              </div>
              <p className="text-white-darker text-sm leading-relaxed">
                Regular household waste collection service.
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <YellowTruck className="size-6" />
                <span>Special Order / Request</span>
              </div>
              <p className="text-white-darker text-sm leading-relaxed">
                Street cleaning and maintenance service.
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <BlueTruck className="size-6" />
                <span>Recycling</span>
              </div>
              <p className="text-white-darker text-sm leading-relaxed">
                Recycling of paper, plastics, and metals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function EventItem({ event }: { event: CalendarEvent }) {
  return (
    <div
      className={cn(
        "bg-white-normal mb-2 rounded-md border-l-[3px] px-4 py-3",
        event.eventType == "pickup" ? "border-primary" : "border-yellow-normal",
      )}
    >
      <p className="mb-1 flex gap-1">
        <span>
          {event.eventType == "pickup" ? (
            <GreenTruck className="size-5" />
          ) : (
            <YellowTruck className="size-5" />
          )}
        </span>
        <p className="text-sm text-[#333]">
          {event.title.split(" #")[0] || "No title"}
        </p>
      </p>
      <p
        className={cn(
          "text-sm text-[#333]",
          event.description ? "mb-1.5" : "text-[#677777] italic",
        )}
      >
        {event.description || "No description"}
      </p>
      <p className="text-xs text-zinc-500">
        {formatDate(event.time, "hh:mm a")}
      </p>
      <p className="text-xs text-zinc-500 capitalize">
        Status: {event.status.toLocaleLowerCase()}
      </p>
    </div>
  );
}

export default PickupSchedules;
