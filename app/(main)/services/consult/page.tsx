"use client";

import { DataTable } from "@/components/data-table";
import { useConsultation } from "@/services/consult";
import { consultColumns } from "./consultColumns";
import { Button } from "@/components/ui/button";

const Consult = () => {
  const { data } = useConsultation({ pageSize: 9 });
  return (
    <div className="grid gap-4 px-5">
      <p className="text-lg">Consult With Us!</p>

      <div className="border-white-dark rounded-xl rounded-tl-none border p-4">
        <p>Need Expert Advice?</p>
        <div className="text-white-darker mt-2 text-sm">
          <p>
            Submit a consultation request and our team will get back to you.
          </p>

          <Button className="mt-2 max-w-[136px]">Create Now</Button>
        </div>
      </div>

      <DataTable columns={consultColumns} data={data?.data} />
    </div>
  );
};

export default Consult;
