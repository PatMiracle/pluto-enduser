"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { OrderItem } from "@/services/orders";
import { Product } from "@/services/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

type MarketCardProps = {
  product: Product;
};

export const getDiscountPercentage = (
  original: number,
  discounted: number,
): string => {
  const percentage = Math.round(((original - discounted) / original) * 100);
  return `-${percentage}%`;
};

export function MarketCard({ product }: MarketCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="border-white-dark grow rounded-lg border p-3">
      <div className="mb-2 flex items-center">
        {product.perUnitDiscountedPoints < product.perUnitPoints && (
          <span className="bg-green-dark-hover text-white-normal grid place-content-center rounded-sm px-1.5 py-0.5 text-[10px]">
            {getDiscountPercentage(
              product.perUnitPoints,
              product.perUnitDiscountedPoints,
            )}
          </span>
        )}

        <button
          className="text-primary ml-auto"
          onClick={() => setLiked(!liked)}
        >
          {liked ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
        </button>
      </div>
      <Link href={`/rewards/${product.productId}`}>
        <Image
          src={product.productImageURL}
          alt={product.productName}
          width={500}
          height={500}
          className="h-32 w-full object-cover md:h-40 lg:h-44"
        />
        <div className="pt-1">
          <p className="h-5 text-sm">{product.productName}</p>
          <p className="text-primary text-xs">
            {product.perUnitDiscountedPoints || product.perUnitPoints} Points
          </p>
        </div>
      </Link>
    </div>
  );
}

export function RewardCard({ data }: { data: OrderItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="border-white-dark grow rounded-lg border p-3">
      <div className="mb-2 flex items-center">
        <span className="bg-green-dark-hover text-white-normal grid place-content-center rounded-sm px-1.5 py-0.5 text-[10px]">
          {data.orderStatus}
        </span>

        <button
          className="text-primary ml-auto"
          onClick={() => setLiked(!liked)}
        >
          {liked ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
        </button>
      </div>
      <Link href={`/rewards/${data.orderId}/order-details`}>
        <Image
          src={data.imageURL}
          alt={data.productName}
          width={500}
          height={500}
          className="h-32 w-full object-cover md:h-40 lg:h-44"
        />
        <div className="pt-1">
          <p className="h-5 text-sm">{data.productName}</p>
          <p className="text-primary text-xs">{data.totalPoints} Points </p>
        </div>
      </Link>
    </div>
  );
}

export function MarketCardSkeleton() {
  return (
    <div className="border-white-dark grow rounded-lg border p-3">
      <div className="mb-2 flex items-center">
        <Skeleton className="h-5 w-12" />
        <div className="ml-auto">
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>

      <Skeleton className="mb-1 h-32 w-full md:h-40 lg:h-44" />

      <div className="space-y-2 pt-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
