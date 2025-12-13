"use client";

import { DataTable } from "@/components/data-table";
import { useContactCenter } from "@/services/contact-center";
import { useTrackedStates } from "@/services/enum-api";
import { MdApartment, MdOutlineInfo } from "react-icons/md";
import { contactColumns } from "./contactColumn";
import useAuthStore from "@/store/AuthStore";

const ContactUs = () => {
  const { user } = useAuthStore();

  const { data, pagination } = useContactCenter({
    stateId: user!.stateWasteManagementBoardId!,
    pageSize: 10,
  });

  const { data: rawStates } = useTrackedStates();

  const state = rawStates?.find(
    (v) => v.stateId == user?.stateWasteManagementBoardId,
  )?.stateName;

  return (
    <div className="mx-4 grid gap-4">
      <p className="text-lg">Contact Centre</p>

      <div className="border-white-dark bg-white-normal max-w-xl rounded-sm border p-2">
        <div className="text-primary bg-green-light flex items-center gap-2 p-2">
          <MdApartment />
          <span className="text-sm capitalize">{state}</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <MdOutlineInfo className="text-red-normal" />
        <p className="text-white-darker text-sm">
          Operational hours are affected by State and National holidays
        </p>
      </div>

      <DataTable columns={contactColumns} data={data} pagination={pagination} />
    </div>
  );
};

export default ContactUs;
