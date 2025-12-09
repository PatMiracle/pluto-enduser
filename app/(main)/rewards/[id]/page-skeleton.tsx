import { Skeleton } from "@/components/ui/skeleton";

export function ProductPageSkeleton() {
  return (
    <>
      {/* Back button */}
      <div className="mt-5 flex items-center gap-1">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-12" />
      </div>

      <div className="py-5 sm:max-w-xl lg:grid lg:max-w-7xl lg:grid-cols-2">
        {/* Mobile discount badge and favorite */}
        <div className="flex items-center justify-between pb-1 lg:hidden">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="ml-auto h-5 w-5 rounded-full" />
        </div>

        {/* Image section */}
        <div>
          <div className="border-white-dark rounded-lg border p-3">
            <Skeleton className="h-[270px] w-full sm:h-[350px]" />
          </div>

          {/* Thumbnail images */}
          <div className="flex items-center justify-center gap-2 py-5">
            <Skeleton className="h-14 w-20 sm:h-[84px] sm:w-32" />
            <Skeleton className="h-14 w-20 sm:h-[84px] sm:w-32" />
            <Skeleton className="h-14 w-20 sm:h-[84px] sm:w-32" />
          </div>
        </div>

        {/* Product details section */}
        <div className="px-4 pb-8">
          {/* Desktop discount badge and favorite */}
          <div className="hidden items-center justify-between pb-1 lg:flex">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="ml-auto h-5 w-5 rounded-full" />
          </div>

          {/* Product name */}
          <Skeleton className="mb-3 h-8 w-3/4" />

          {/* Product description */}
          <div className="mb-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Pricing */}
          <div className="mb-3 flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Delivery date */}
          <Skeleton className="mb-3 h-5 w-48" />

          {/* Reviews */}
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Colors */}
          <div className="mt-2.5 mr-auto flex w-max items-center gap-2">
            <Skeleton className="h-9 w-32 rounded-3xl" />
          </div>

          {/* Action buttons */}
          <div className="grid gap-2 py-3">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Product Details Accordion */}
          <div className="border-white-dark rounded-lg border px-3 py-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
