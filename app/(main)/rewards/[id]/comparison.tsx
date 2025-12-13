import { chunkArray } from "@/lib/chunk-array";
import { useProducts } from "@/services/products";
import React, { useEffect, useRef, useState } from "react";
import { renderStars } from "../render-stars";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  id: string;
};

export default function ProductsComparison({ id }: Props) {
  const { data } = useProducts();

  const products = data?.filter((p) => p.productId !== +id);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 3;
  const paginatedPages = products ? chunkArray(products, itemsPerPage) : [];
  const totalPages = paginatedPages.length;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto px-5 py-4"
      >
        {paginatedPages[currentPage - 1]?.map((p) => (
          <div
            key={p.productId}
            className="flex flex-col gap-6 pb-6 not-last:border-b md:flex-row"
          >
            {/* Image + Info */}
            <div className="flex-1">
              <div className="flex justify-center py-6">
                <img
                  src={p.productImageURL}
                  alt=""
                  className="h-48 object-contain"
                />
              </div>

              <div className="px-2">
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  {p.productName}
                </h3>

                <div className="mb-3 flex items-center gap-2">
                  <span className="font-medium text-green-600">
                    {p.perUnitDiscountedPoints} points
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {p.perUnitPoints} points
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-sm">
                    {renderStars(p.avgReviews)}
                  </div>
                  <a
                    href={`/rewards/${p.productId}`}
                    className="rounded-sm bg-green-600 px-2 py-0.5 text-[13px] text-white"
                  >
                    Swap
                  </a>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="flex-1">
              {p.weight && (
                <ComparisonRow
                  label="Weight"
                  value={`${p.weight} ${p.weightUnit}`}
                />
              )}

              {p.availableOptions?.length > 0 && (
                <ComparisonRow
                  label="Colour"
                  value={p.availableOptions.map((c) => c.colorName).join(", ")}
                />
              )}

              {p.shape && <ComparisonRow label="Shape" value={p.shape} />}

              {p.productMaterial && (
                <ComparisonRow label="Material" value={p.productMaterial} />
              )}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 border-t px-5 py-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {paginatedPages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`\ h-8 w-8 rounded text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const ComparisonRow = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-2 grid grid-cols-2 gap-1 bg-green-50">
    <div className="bg-green-50 px-3 py-2 text-sm font-medium text-gray-800">
      {label}
    </div>
    <div className="bg-green-50 px-3 py-2 text-sm text-gray-700 capitalize">
      {value}
    </div>
  </div>
);
