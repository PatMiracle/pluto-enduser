import { Button } from "@/components/ui/button";
import React from "react";

export default function GovernmentDetails() {
  return (
    <div className="mx-auto w-11/12 max-w-xl">
      <p className="text-blue-normal text-center text-3xl sm:text-4xl">
        Personal Account
      </p>

      <div className="grid gap-4 pt-10"></div>

      <div className="flex justify-center gap-5 py-10">
        <Button className="min-w-24">Previous</Button>
        <Button className="w-24">Next</Button>
      </div>
    </div>
  );
}
