"use client";

import { sentenceCase } from "@/app/(main)/locations/dropLocationColumns";
import { useOrder } from "@/services/orders";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();

  const { data } = useOrder(id);
  const [liked, setLiked] = useState(false);

  if (!data) {
    return <></>;
  }

  return (
    <div>
      <Link href="/rewards" className="mt-5 flex items-center gap-1">
        <MdKeyboardArrowLeft className="text-primary" size={24} /> Back
      </Link>

      <div className="my-5 max-w-3xl">
        <p className="text-xl font-semibold">Order Details</p>
        {/* Order Info */}
        <div className="py-5">
          <p className="text-[#374151]">Order id: #{data.orderId}</p>
          <p className="text-[#374151]">Items: {data.quantity}</p>
          <p className="text-[#374151]">
            {" "}
            Date Ordered:{" "}
            {formatDate(
              data.checkout.pickupStation.dateCreated,
              "dd MMMM, yyyy",
            )}
          </p>
        </div>
        {/* Notice */}
        <p className="text-md rounded-lg bg-amber-100 px-3 py-2 text-amber-900">
          <span className="font-semibold">NOTICE:</span> This items will be
          (was) available for pickup latest 2 weeks from{" "}
          {data.arrivalDate
            ? formatDate(data.arrivalDate, "dd MMMM, yyyy")
            : "[Order Date]"}
        </p>
        {/* Items Section */}
        <div className="grid gap-4 py-4">
          {/* Item Details */}
          <div className="border-white-dark mb-2 grid gap-2 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="bg-green-dark-hover text-white-normal grid place-content-center rounded-lg px-2 py-0.5 text-[10px]">
                {data.orderStatus}
              </span>
              <button
                className="text-primary ml-auto"
                onClick={() => setLiked(!liked)}
              >
                {liked ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src={data.imageURL}
                alt={data.productName}
                width={300}
                height={300}
                className="size-20 object-cover"
              />
              <div>
                <p className="text-xs lg:text-sm">{data.productName}</p>
                <p className="text-white-darker text-xs lg:text-sm">
                  QTY: {data.quantity}
                </p>
              </div>
              <div className="ml-auto self-end">
                <p className="text-white-darker text-xs lg:text-sm">
                  Total Pts
                </p>
                <p className="text-primary text-right text-lg lg:text-xl">
                  {data.totalPoints}
                </p>
              </div>
            </div>
          </div>

          <div className="border-white-dark mb-2 rounded-lg border p-3">
            <p>Delivery Information</p>
            <div className="grid gap-2 py-4 text-sm">
              <div>
                <p>Delivery Method</p>
                <p className="text-white-darker text-xs">
                  {data.checkout.deliveryMode}
                </p>
              </div>
              <div>
                <p>Drop-Off Station Address</p>
                <p className="text-white-darker text-xs">
                  {data.checkout.pickupStation.address}
                </p>
              </div>
              <div>
                <p>Opening Hours:</p>
                {data.checkout.pickupStation?.openingHours?.map((e) => (
                  <p className="text-white-darker text-xs">
                    {sentenceCase(
                      (e.dayOfWeek.includes("DAY")
                        ? e.dayOfWeek
                        : e.dayOfWeek + "day"
                      ).toLocaleLowerCase() + "s",
                    ) +
                      " " +
                      e.openingTime.slice(0, -3) +
                      " - " +
                      e.closingTime.slice(0, -3)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {data.fulfillmentDate && (
            <div className="border-white-dark mb-2 rounded-lg border p-3">
              <p>Reward Claim Information</p>
              <div className="grid gap-2 py-4 text-sm">
                <p>
                  Date Claimed: <span className="text-white-darker"></span>
                </p>
                <p>
                  Claimed on behalf of:{" "}
                  <span className="text-white-darker"></span>
                </p>
                <p>
                  ⁠Proxy Picker Name:{" "}
                  <span className="text-white-darker"></span>
                </p>
                <p>
                  ⁠Proxy Picker Phone Number:{" "}
                  <span className="text-white-darker"></span>
                </p>
                <p>
                  ⁠Proxy Means of Identification:
                  <span className="text-white-darker"></span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
