"use client";
import { useState } from "react";
import { Truck } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MdChevronLeft,
  MdChevronRight,
  MdInfo,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import GreenTruck from "@/public/green-truck";
import YellowTruck from "@/public/yellow-truck";
import BlueTruck from "@/public/blue-truck";

const PickupSchedules = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());
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

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const headers = weekDays.map((day) => (
      <div
        key={day}
        onClick={() => console.log(day)}
        className="text-white-darker py-3 text-center text-sm"
      >
        {day}
      </div>
    ));

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-16 cursor-pointer border border-gray-200"
        />,
      );
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isTodayCell = isToday(day);
      const isSelectedDate = currentDate.getDate() == day;

      days.push(
        <button
          key={day}
          onClick={() => {
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
            );
          }}
          className={cn(
            "flex h-16 flex-col items-center justify-center border border-gray-200 p-2",
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
          <span className="flex flex-wrap justify-center gap-0.5">
            {/* event truck  icons here */}
            <GreenTruck className="size-4 lg:size-5" />
          </span>
        </button>,
      );
    }

    return (
      <div className="mb-6 overflow-hidden">
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
            <button>
              <MdChevronLeft size={24} />
            </button>
            <span>Now</span>
            <button>
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-t">
          {headers}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div
        className="flex items-center gap-2 px-5 py-4"
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      >
        <button onClick={() => router.back()}>
          <MdKeyboardArrowLeft size={28} className="text-primary" />
        </button>
        <h1 className="text-lg font-bold">Pickup Schedules</h1>
      </div>

      <div className="px-6 lg:flex lg:flex-row-reverse lg:py-0">
        <div className="flex-1 py-6 lg:pl-5">{renderCalendar()}</div>

        <div className="pt-6 pr-5 lg:border-r">
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

export default PickupSchedules;
