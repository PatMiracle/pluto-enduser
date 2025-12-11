import { Alert, AlertAction } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useModal } from "@/context/ModalProvider";
import { cn } from "@/lib/utils";
import { useClientLocations } from "@/services/client-locations";
import { LONG_TTL } from "@/services/enum-api";
import { useMakePayment, usePayments } from "@/services/payments";
import { formatDate } from "date-fns";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineCottage } from "react-icons/md";
import LocationDeleteForm from "./location-delete-form";

function sentenceCase(a: string) {
  return a && a.length ? a.charAt(0).toLocaleUpperCase() + a.slice(1) : a;
}

const Billing = () => {
  const { data: locationData } = useClientLocations();

  const [activeLocationId, setActiveLocationId] = useState<number>();

  const clientLocations = locationData?.data;
  const activeLocation = clientLocations?.find(
    (loc) => loc.clientLocationId === activeLocationId,
  );

  const { data: payments, isPending: loadingPayment } = usePayments(
    {
      pickupLocation: activeLocationId,
    },
    {
      enabled: !!activeLocationId,
      staleTime: activeLocation?.locationStatus === "ACTIVE" ? LONG_TTL : 30000,
    },
  );
  const pendingPayment = payments?.[0];

  const { mutate: makePayment } = useMakePayment();
  const { getModalProps, openModal } = useModal();

  useEffect(() => {
    if (clientLocations?.length && !activeLocationId) {
      setActiveLocationId(clientLocations[0].clientLocationId);
    }
  }, [activeLocationId, clientLocations]);

  if (!clientLocations) {
    return <BillingTabSkeleton />;
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-5">
      {/* Location Buttons */}
      <div className="mb-4 flex gap-2">
        {clientLocations.map((location, j) => (
          <button
            key={j}
            onClick={() => setActiveLocationId(location.clientLocationId)}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-colors ${
              activeLocationId === location.clientLocationId
                ? "bg-green-normal text-white-normal font-bold"
                : "bg-green-light-active text-green-normal"
            }`}
          >
            Location {j + 1}
          </button>
        ))}
      </div>

      {activeLocation ? (
        <div className="border-white-dark w-full max-w-md space-y-6 rounded-2xl border p-6 lg:grid lg:max-w-4xl lg:grid-cols-2 lg:gap-4">
          {/* Location Card */}
          <div className="border-white-dark space-y-3 rounded-xl border p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="border-green-light-active flex items-center rounded border px-3 py-2 text-xs">
                Account ID: #{activeLocation.clientLocationId}
              </span>

              <span
                className={cn(
                  "text-white-normal rounded px-2 py-1 text-xs",
                  activeLocation.locationStatus === "ACTIVE"
                    ? "bg-green-normal"
                    : "bg-red-normal",
                )}
              >
                {activeLocation.locationStatus}
              </span>
            </div>

            <Image
              src={activeLocation.previewImage}
              alt=""
              width={400}
              height={400}
              className="size-40 w-full rounded object-cover"
            />

            {/* Address */}
            <div>
              <p className="line-clamp-2 text-xs">{activeLocation.address}</p>
              <p className="text-white-darker text-xs capitalize">
                {sentenceCase(activeLocation.state)},{" "}
                {sentenceCase(activeLocation.lga)} |{" "}
                {activeLocation.landmarkName}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
              <div className="border-green-light-active flex items-center gap-2 rounded-full border px-3 py-1">
                <MdOutlineCottage className="text-primary" />
                <span className="text-xs">
                  {activeLocation.locationTypeName}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal("delete")}
                  className="border-green-light-active hover:border-red-light flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                >
                  <Trash2 className="text-red-normal size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="space-y-4">
            <div>
              <div className="flex gap-2 px-3">
                <span className="text-white-darker text-xs">
                  Date Registered:
                </span>
                <span className="text-white-darker text-xs">
                  {formatDate(activeLocation.dateCreated, "d MMM, yyyy")}
                </span>
              </div>
              <div className="flex gap-2 px-3">
                <span className="text-white-darker text-xs">
                  Assigned Area:
                </span>
                <span className="text-white-darker text-xs capitalize">
                  {activeLocation.lga}
                </span>
              </div>
              <div className="flex gap-2 px-3">
                <span className="text-white-darker text-xs">
                  Assigned Landmark:
                </span>
                <span className="text-white-darker text-xs">
                  {activeLocation.landmarkName}
                </span>
              </div>
            </div>

            {/* Current Bill */}
            <div className="bg-green-light space-y-1 py-2">
              <div className="flex justify-between px-3">
                <span className="text-white-darker text-xs">
                  Bill charges due -{" "}
                  {pendingPayment?.pickupSubscription.subscriptionStartDate &&
                    formatDate(
                      pendingPayment?.pickupSubscription.subscriptionStartDate,
                      "d MMM, yyyy",
                    )}
                </span>
                <span className="text-white-darker text-xs">
                  ₦ {pendingPayment?.paymentAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between px-3">
                <span className="text-xs">View Current Bill (PDF)</span>
              </div>
            </div>

            {/* Total Balance */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-white-darker text-lg">Total Balance</span>
              <span className="text-white-darker text-2xl">
                ₦ {pendingPayment?.paymentAmount.toLocaleString()}
              </span>
              <Button
                disabled={pendingPayment?.paymentStatus !== "PENDING"}
                variant={"secondary"}
                className="w-full rounded-none"
                onClick={() => {
                  makePayment(pendingPayment?.paymentId as number, {
                    onSuccess: (v) => console.log(v),
                  });
                }}
              >
                MAKE A PAYMENT
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500">No locations added.</p>
        </div>
      )}
      <Alert
        {...getModalProps("delete")}
        description="By deleting this location this cannot be undone and you will need to contact your Area Waste Management service to reinstall the service for this location or manually create the location if it is needed in the future."
      >
        <Button
          variant={"destructive"}
          onClick={() => {
            openModal("delete-form");
          }}
        >
          Delete
        </Button>
      </Alert>
      <Alert
        {...getModalProps("delete-form")}
        title="Reason for deleting this location?"
        description=""
        showInfoIcon={false}
      >
        <LocationDeleteForm id={activeLocation?.clientLocationId || 0} />
      </Alert>
    </div>
  );
};

const BillingTabSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      {/* Location Buttons Skeleton */}
      <div className="mb-4 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-xl" />
        ))}
      </div>

      <div className="border-white-dark w-full max-w-md rounded-2xl border lg:max-w-4xl">
        <div className="grid w-full space-y-6 p-6 lg:grid lg:max-w-4xl lg:grid-cols-2 lg:gap-4">
          {/* Location Card Skeleton */}
          <div className="border-white-dark space-y-3 rounded-xl border p-5">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-6 w-16 rounded" />
            </div>

            {/* Property Image Skeleton */}
            <Skeleton className="h-40 w-full rounded" />

            {/* Address Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>

            {/* Footer Actions Skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-7 w-24 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </div>

          {/* Billing Info Skeleton */}
          <div className="space-y-4">
            {/* Registration Info Skeleton */}
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-2 px-3">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>

            {/* Current Bill Skeleton */}
            <div className="space-y-2 bg-green-50 py-2">
              <div className="flex justify-between px-3">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="px-3">
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            {/* Total Balance Skeleton */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-9 w-40" />
              <Skeleton className="mt-2 h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
