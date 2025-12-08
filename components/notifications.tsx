"use client";

import { usePaginatedQuery } from "@/hooks/useApiQuery";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowLeft, MdNotificationsNone } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

type Notification = {
  id: number;
  title: string;
  body: string;
  htmlContent: null;
  imageUrl: null;
  clientId: string;
  client: null;
  metaData: null;
  actionType: null;
  dateCreated: string;
  lastModified: string;
};

type Response = {
  data: Notification[];
  pagination: Pagination;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: false }).replace("about", "");
};

export default function Notifications() {
  const { data: notifications, isPending } = usePaginatedQuery<Response>(
    "notifications",
    "/user/notifications",
  );

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowNotifications(true)}
        size={"icon"}
        variant={"ghost"}
        className="text-green-normal border-green-light-active relative size-8 rounded-full border"
      >
        <span className="bg-green-normal text-white-normal absolute -top-1 right-0 grid size-3 place-content-center rounded-full text-[7px]">
          {notifications?.length}
        </span>
        <MdNotificationsNone />
      </Button>

      {showNotifications && (
        <div className="bg-white-normal fixed top-0 right-0 z-100 h-full w-full max-w-md border-l px-4">
          <div className="flex h-14 items-center gap-4">
            <button
              onClick={() => setShowNotifications(false)}
              className="text-primary hover:text-green-dark-hover text-2xl"
            >
              <MdKeyboardArrowLeft />
            </button>
            <span className="font-semibold">Notifications</span>
          </div>
          <div>
            {isPending && <p>Loading Notifications...</p>}
            {notifications?.map(({ title, body, lastModified, id }) => (
              <div
                key={id}
                className="flex justify-between gap-2 border-b border-b-[#efeaf4] py-1.5 text-sm"
              >
                <div className="max-w-[80%]">
                  <p>{title}</p>
                  <p className="text-[#7C7C7C]">{body}</p>
                </div>
                <p className="text-[#A0A0A0]">{formatDate(lastModified)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
