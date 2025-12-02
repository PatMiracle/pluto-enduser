import { cn } from "@/lib/utils";
import {
  ServiceRequest,
  useCancelRequest,
} from "@/services/service-requests-api";
import { format } from "date-fns";
import { getRequestStatusStyle } from "./requestColumns";
import { Button } from "@/components/ui/button";
import { MdEdit, MdInfoOutline } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertCancel, Modal } from "@/components/modal";
import { useModal } from "@/context/ModalProvider";

type Props = {
  data: ServiceRequest;
};

export default function EventPickup({ data }: Props) {
  const editable = data.orderStatus === "NEW" || data.orderStatus === "PENDING";

  const { openModal } = useModal();

  return (
    <div className="grid gap-4">
      <div className="flex">
        <Field label="State" value={data.landmark.stateName} capitalize />
        <Field label="LGA" value={data.landmark.lgaName} capitalize />
      </div>
      <div className="flex">
        <Field label="Landmark" value={data.landmark.landmarkName} />
        <Field label="Postal Code" value={data.landmark.postalCode} />
      </div>
      <div className="flex">
        <Field label="Pickup Date" value={data.startDate} />
        <Field
          label="Date Created"
          value={
            data.dateCreated
              ? format(new Date(data.dateCreated), "d MMM, yyyy")
              : "-"
          }
        />
      </div>
      <div className="flex">
        <Field label="Event Type" value={data.serviceRequestType} />
        <Field label="Contact Number" value={data.contactNumber} />
      </div>
      <Field label="Email Address" value={data.contactEmail} />
      <Field label="Pickup Address" value={data.pickupAddress} />
      <Field label="Description" value={data.description} />
      <div>
        <p className="text-white-darker mb-0.5 text-xs">Status:</p>
        <span
          className={cn(
            "block w-16 rounded-sm border py-1 text-center text-[10px] md:text-xs",
            getRequestStatusStyle(data.orderStatus).style,
          )}
        >
          {getRequestStatusStyle(data.orderStatus).text}
        </span>
      </div>
      {editable && (
        <div className="flex items-center justify-between">
          <CancelRequest
            requestId={data.serviceRequestId}
            eventType={data.serviceRequestType}
          />

          <Button
            onClick={() => openModal("edit" + data.serviceRequestId)}
            size={"icon"}
            variant={"ghost"}
            className="text-green-normal border-green-light-active size-8 rounded-full border"
          >
            <MdEdit />
          </Button>
        </div>
      )}
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  capitalize?: boolean;
};

function Field({ label, value, capitalize = false }: FieldProps) {
  return (
    <div className="mr-4 flex-1">
      <p className="text-white-darker mb-0.5 text-xs">{label}</p>
      <p className={cn(capitalize && "capitalize")}>{value}</p>
    </div>
  );
}

function CancelRequest({
  requestId,
  eventType,
}: {
  requestId: number;
  eventType: string;
}) {
  const { mutate, isPending } = useCancelRequest();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Cancel Request</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-red-normal justify-center rounded-sm rounded-bl-3xl border-[1.5px] sm:max-w-md">
        <AlertDialogHeader className="items-center justify-center">
          <MdInfoOutline className="text-red-normal" size={24} />
          <AlertDialogTitle className="font-normal">
            Cancel Request
          </AlertDialogTitle>
          <p className="text-white-darker -mt-2 text-[11px]">
            ID #{requestId} - {eventType}
          </p>
          <AlertDialogDescription className="text-white-darker text-sm">
            Are you sure you want to cancel your pickup request?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex-row justify-center gap-4 sm:justify-center">
          <AlertCancel>No</AlertCancel>
          <Button
            variant={"destructive"}
            disabled={isPending}
            onClick={() => mutate(requestId)}
          >
            Cancel
          </Button>
        </AlertDialogFooter>
        <div className="flex gap-2 rounded-lg border border-[#FFE5CC] bg-[#FFF8F0] p-2">
          <MdInfoOutline className="text-red-normal" size={17} />
          <p className="text-[11px] text-[#8B4513]">
            If you cancel this booking, it cannot be rescheduled and your refund
            will be processed according to the terms and Conditions.
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
