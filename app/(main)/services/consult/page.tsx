"use client";

import { DataTable } from "@/components/data-table";
import { useConsultation } from "@/services/consult";
import { consultColumns } from "./consultColumns";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";
import { useModal } from "@/context/ModalProvider";
import ConsultForm from "./consult-form";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Consult = () => {
  const { data, pagination } = useConsultation({ pageSize: 9 });
  const { getModalProps, openModal } = useModal();
  return (
    <div className="grid gap-4 px-5">
      <Link href="/services" className="flex items-center gap-1">
        <MdKeyboardArrowLeft className="text-primary" size={24} /> Back
      </Link>
      <p className="text-lg font-semibold">Consult With Us!</p>

      <div className="border-white-dark rounded-xl rounded-tl-none border p-4">
        <p>Need Expert Advice?</p>
        <div className="text-white-darker mt-2 text-sm">
          <p>
            Submit a consultation request and our team will get back to you.
          </p>

          <Button
            className="mt-2 max-w-[136px]"
            onClick={() => openModal("consult")}
          >
            Create Now
          </Button>

          <Modal
            title="Consult with Us!"
            description="Consultation Request"
            {...getModalProps("consult")}
          >
            <ConsultForm />
          </Modal>
        </div>
      </div>

      <DataTable columns={consultColumns} data={data} pagination={pagination} />
    </div>
  );
};

export default Consult;
