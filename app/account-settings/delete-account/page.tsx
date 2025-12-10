"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DeleteAccount = () => {
  return (
    <div className="max-w-lg px-5">
      <p className="text-lg">Delete Account</p>
      <div className="grid gap-2 pt-5">
        <Select>
          <SelectTrigger
            className="bg-red-light-active-hover *:data-[slot=select-value]:text-red-normal data-placeholder:text-red-normal w-full capitalize"
            // disabled
          >
            <div className="flex max-w-[80%] items-center gap-2">
              <div className="flex-1 overflow-hidden text-[13px]">
                <SelectValue
                  placeholder="Select Reason"
                  className="block truncate capitalize"
                />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-red-light-active-hover">
            <SelectGroup>
              <SelectLabel className="capitalize">Select Reason</SelectLabel>
              {/* {options.map((opt) => (
                <SelectItem
                  key={String(opt.value)}
                  value={String(opt.value)}
                  className="cursor-pointer capitalize"
                >
                  {opt.label}
                </SelectItem>
             ))} */}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="destructive" disabled>
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
