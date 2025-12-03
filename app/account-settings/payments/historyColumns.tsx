"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Modal } from "@/components/modal";
import { useModal } from "@/context/ModalProvider";
import { Payment } from "@/services/payments";
import { useState } from "react";
import api from "@/lib/apiClient";
import { toast } from "sonner";

export const historyColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "paymentStatus",
    header: "Status",
  },
  {
    accessorKey: "paymentAmount",
    header: "Amount",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type",
  },
  {
    accessorKey: "paymentDate",
    header: "Date",
    cell: ({ cell }) => {
      const v = cell.renderValue() as string;
      return <span>{format(v, "d MMM, yyyy")} </span>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const { getModalProps, openModal, closeModal } = useModal();
      const [loading, setLoading] = useState(false);
      const getDownloadLink = async (paymentId: number) => {
        setLoading(true);
        try {
          const res = await api.get(`/user/payments/${paymentId}/print`);
          window.open(res.data.downloadLink, "_blank");
          closeModal();
        } catch (error) {
          toast.error("Sorry there was an error fetching download link");
        } finally {
          setLoading(false);
        }
      };

      return (
        <>
          <Button
            size={"sm"}
            className="px-5"
            onClick={() => {
              openModal("" + row.original.paymentId);
              getDownloadLink(row.original.paymentId);
            }}
          >
            View
          </Button>

          <Modal
            title="Fetching Download link..."
            {...getModalProps("" + row.original.paymentId)}
          >
            <div className="flex h-14 flex-col items-center justify-center gap-4">
              {loading ? (
                <div className="border-green-normal h-6 w-6 animate-spin rounded-full border-0 border-y-2"></div>
              ) : (
                <Button onClick={() => getDownloadLink(row.original.paymentId)}>
                  Retry
                </Button>
              )}
            </div>
          </Modal>
        </>
      );
    },
  },
];
