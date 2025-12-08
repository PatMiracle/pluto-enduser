"use client";
import React, { useState } from "react";
import { ChevronLeft, Truck } from "lucide-react";

const PickupSchedules = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Dummy schedule data
  const scheduleData = {
    "2024-12-4": ["garbage"],
    "2024-12-6": ["garbage", "recycling"],
    "2024-12-11": ["special"],
    "2024-12-13": ["garbage"],
    "2024-12-18": ["garbage", "recycling"],
    "2024-12-20": ["special"],
    "2024-12-25": ["holiday"],
    "2024-12-27": ["garbage"],
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return `${year}-${month + 1}-${day}`;
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

    // Week day headers
    const headers = weekDays.map((day) => (
      <div
        key={day}
        className="py-2 text-center text-sm font-semibold text-gray-600"
      >
        {day}
      </div>
    ));

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="aspect-square border border-gray-200"
        ></div>,
      );
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = getDateKey(day);
      const events = scheduleData[dateKey] || [];
      const isTodayCell = isToday(day);

      days.push(
        <div
          key={day}
          className={`flex aspect-square flex-col items-center justify-start border border-gray-200 p-2 ${
            isTodayCell ? "bg-green-50" : ""
          }`}
        >
          <div
            className={`mb-1 text-sm font-medium ${isTodayCell ? "text-green-600" : "text-gray-700"}`}
          >
            {day}
          </div>
          <div className="flex flex-wrap justify-center gap-0.5">
            {events.includes("garbage") && (
              <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-500">
                <Truck size={10} className="text-white" />
              </div>
            )}
            {events.includes("special") && (
              <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-yellow-500">
                <Truck size={10} className="text-white" />
              </div>
            )}
            {events.includes("recycling") && (
              <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-blue-500">
                <Truck size={10} className="text-white" />
              </div>
            )}
          </div>
        </div>,
      );
    }

    return (
      <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="bg-green-600 py-3 text-center text-lg font-semibold text-white">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="grid grid-cols-7">
          {headers}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="flex items-center px-5 py-4"
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      >
        <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
          <ChevronLeft size={28} className="text-green-600" />
        </button>
        <h1 className="text-lg font-bold">Pickup Schedules</h1>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-6">
        {/* Calendar */}
        {renderCalendar()}

        {/* Legend Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-700">Legend</h2>

          <div className="space-y-6">
            {/* Garbage Pickup */}
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500">
                  <Truck size={14} className="text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Garbage Pickup
                </h3>
              </div>
              <p className="ml-9 text-sm leading-relaxed text-gray-600">
                Regular household waste collection service.
              </p>
            </div>

            {/* Special Order/Request */}
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-yellow-500">
                  <Truck size={14} className="text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Special Order / Request
                </h3>
              </div>
              <p className="ml-9 text-sm leading-relaxed text-gray-600">
                Street cleaning and maintenance service.
              </p>
            </div>

            {/* Recycling */}
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500">
                  <Truck size={14} className="text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Recycling</h3>
              </div>
              <p className="ml-9 text-sm leading-relaxed text-gray-600">
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
