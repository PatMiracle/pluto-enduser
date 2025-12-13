"use client";

import { useProduct } from "@/services/products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { getDiscountPercentage } from "../reward-card";
import Image from "next/image";
import { formatDate } from "date-fns";
import { renderStars } from "../render-stars";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductPageSkeleton } from "./page-skeleton";
import { useModal } from "@/context/ModalProvider";
import { Modal } from "@/components/modal";
import ProductsComparison from "./comparison";

export default function Product() {
  const { id } = useParams<{ id: string }>();

  const { data: product } = useProduct(id);

  const [liked, setLiked] = useState(false);
  const [imageInPreview, setImageInPreview] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { openModal, getModalProps } = useModal();

  useEffect(() => {
    if (product) setImageInPreview(product.productImageURL);
  }, [product]);

  if (!product) {
    return <ProductPageSkeleton />;
  }

  return (
    <>
      <Link href="/rewards" className="mt-5 flex items-center gap-1">
        <MdKeyboardArrowLeft className="text-primary" size={24} /> Back
      </Link>
      <div className="py-5 sm:max-w-xl lg:grid lg:max-w-7xl lg:grid-cols-2">
        <div className="flex items-center justify-between pb-1 lg:hidden">
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
        <div>
          <div className="border-white-dark rounded-lg border p-3">
            <Image
              src={imageInPreview}
              alt={product.productName}
              width={500}
              height={500}
              className="h-[270px] w-full object-contain sm:h-[350px]"
            />
          </div>
          <div className="flex items-center justify-center gap-2 py-5">
            {product.availableOptions.map((option) => (
              <button
                key={option.optionId}
                onClick={() => setImageInPreview(option.imageURL)}
              >
                <Image
                  src={imageInPreview}
                  alt={product.productName + option.colorName}
                  width={500}
                  height={500}
                  className="h-14 w-20 object-contain sm:h-[84px] sm:w-32"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pb-8">
          <div className="hidden items-center justify-between pb-1 lg:flex">
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
          <h3 className="mb-3 text-2xl font-semibold">{product.productName}</h3>
          <p className="text-white-darker mb-4 text-sm leading-5">
            {product.productInfo}
          </p>
          {/* Pricing */}
          <div className="mb-3 flex items-center gap-2">
            <p className="text-primary">
              {product.perUnitDiscountedPoints} points
            </p>
            <p className="text-white-darker text-xs line-through">
              {product.perUnitPoints} points
            </p>
          </div>
          {/* Delivery Date */}
          <p className="mb-3 text-sm text-[#374151]">
            Date of Arrival:{" "}
            {product.dateOfArrival
              ? formatDate(product.dateOfArrival, "do MMMM, yyyy")
              : "Unspecified"}
          </p>
          {/* reviews */}
          <div className="flex items-center gap-1.5 text-sm">
            <span className="flex">{renderStars(product.avgReviews)}</span>
            <span className="mt-0.5 text-[#6B7280]">
              {product.numReviews} Review
              {product.numReviews > 1 || (product.numReviews == 0 && "s")}
            </span>
          </div>
          {/* colors */}
          <div className="border-white-dark mt-2.5 mr-auto flex w-max items-center gap-2 rounded-3xl border px-3 py-2">
            <span className="text-sm">Colours</span>
            <span className="flex gap-1">
              {product.availableOptions.map((option) => (
                <button
                  key={option.colorName}
                  className={cn(
                    "border-white-darker h-3 w-3 rounded-full border-2",
                  )}
                  style={{
                    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    backgroundColor: option.colorCode,
                  }}
                  onClick={() => {
                    setSelectedColor(option.colorName);
                    setImageInPreview(option.imageURL);
                  }}
                />
              ))}
            </span>
          </div>
          {/* action btns */}
          <div className="grid gap-2 py-3">
            <Modal
              title="Compare"
              {...getModalProps("compare-product")}
              className="lg:w-11/12 lg:max-w-3xl"
            >
              <ProductsComparison id={id} />
            </Modal>
            <Button
              onClick={() => openModal("compare-product")}
              variant="secondary"
            >
              Compare
            </Button>
            <Link href={`/rewards/${id}/checkout`}>
              <Button className="w-full">Claim Now</Button>
            </Link>
          </div>
          {/* Product Details Accordion */}
          <details className="group border-white-dark rounded-lg border px-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-2">
              <span className="text-sm md:text-base">Product Details</span>

              <MdKeyboardArrowDown className="text-green-normal text-lg transition-all duration-300 group-open:rotate-180" />
            </summary>
            <div className="mt-2">
              {product.weight && (
                <ProductDetailRow
                  label="Weight"
                  value={`${product.weight} ${product.weightUnit}`}
                />
              )}
              {product.productColor && (
                <ProductDetailRow
                  label="Colour"
                  value={`${product.availableOptions
                    .map(({ colorName }) => colorName)
                    .join(", ")}`}
                />
              )}
              {product.shape && (
                <ProductDetailRow label="Shape" value={product.shape} />
              )}
              {product.productMaterial && (
                <ProductDetailRow
                  label="Shape"
                  value={product.productMaterial}
                />
              )}
            </div>
          </details>
        </div>
      </div>
    </>
  );
}

interface ProductDetailProps {
  label: string;
  value: string;
}

export function ProductDetailRow({ label, value }: ProductDetailProps) {
  return (
    <div className="bg-green-light mb-2 grid grid-cols-2 p-2 text-sm text-[#374151] capitalize">
      <span className="text-[#374151]">{label}</span>
      <span className="text-[#1F2937]">{value}</span>
    </div>
  );
}
