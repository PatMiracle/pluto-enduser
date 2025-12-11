import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalProvider";
import defaultErrorHandler from "@/lib/error-handler";
import { useDeleteLocation } from "@/services/client-locations";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: number;
};

const LocationDeleteForm = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteLocation();
  const { closeModal } = useModal();

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const reasons = [
    "Payment issue",
    "⁠Poor Service Provider support",
    "Relocating to a new location",
    "High subscription prices",
    "Others",
  ];

  return (
    <div className="-mt-4 w-full">
      {reasons.map((reason) => (
        <label
          key={reason}
          className="flex cursor-pointer gap-1"
          onClick={() => setSelectedReasons((prev) => [...prev, reason])}
        >
          <input
            type="checkbox"
            className="accent-black"
            checked={!!selectedReasons.find((v) => v == reason)}
          />
          <span className="text-sm">{reason}</span>
        </label>
      ))}

      <Button
        onClick={() => {
          mutate(id, {
            onSuccess: (v) => {
              toast.success("Location deleted");
              closeModal();
            },
            onError: (e) => defaultErrorHandler(e),
          });
        }}
        disabled={isPending}
        variant={"destructive"}
        className="mt-2 ml-auto block"
      >
        {isPending ? "Deleting" : "Delete"}
      </Button>
    </div>
  );
};

export default LocationDeleteForm;
