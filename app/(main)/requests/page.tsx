"use client";

import { DataTable, TableSkeleton } from "@/components/data-table";
import {
  ServiceRequest,
  useServiceRequests,
} from "@/services/service-requests-api";
import { requestColumns } from "./requestColumns";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { FaSliders } from "react-icons/fa6";

export default function Requests() {
  const [status, setOrderStatus] = useState<ServiceRequest["orderStatus"]>();
  const [search, setSearch] = useState("");

  const { data: serviceRequests } = useServiceRequests({
    pageSize: 10,
    status,
    search,
  });

  return (
    <div>
      <p className="pl-5 text-lg">Request & Special Orders</p>
      <div className="mt-5 flex flex-col gap-10 xl:flex-row xl:gap-5 xl:px-5 xl:pb-6">
        <div className="flex flex-col gap-5 px-5 xl:px-0">
          {/* Create Request */}
          <div className="border-white-dark rounded-xl rounded-tl-none border p-4">
            <p>Create Request</p>
            <div className="text-white-darker mt-2 text-sm">
              <p>
                Need a professional junk removal service for construction sites,
                event centers, offices, schools, or residential properties?
                Request a specialized waste removal solution tailored to your
                needs.
              </p>
              <div className="mt-1 flex flex-col gap-2">
                <p>
                  Click <span className="font-bold text-black">Create Now</span>{" "}
                  to schedule today!
                </p>
                <Button className="mt-2 max-w-[136px]">Create Now</Button>
              </div>
            </div>
          </div>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Event Type"
            className="md:max-w-md lg:max-w-xl"
            iconLeft={<MdSearch />}
            iconRight={
              <button className="mt-1">
                <FaSliders />
              </button>
            }
          />
          <div>
            <DataTable columns={requestColumns} data={serviceRequests?.data} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
