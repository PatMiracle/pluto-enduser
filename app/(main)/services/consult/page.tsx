"use client";

import { DataTable } from "@/components/data-table";
import { useConsultation } from "@/services/consult";
import { consultColumns } from "./consultColumns";

const Consult = () => {
  const { data } = useConsultation({ pageSize: 9 });
  return (
    <div className="px-5">
      <p>Consult With Us!</p>

      <DataTable columns={consultColumns} data={data?.data} />
    </div>
  );
};

export default Consult;
