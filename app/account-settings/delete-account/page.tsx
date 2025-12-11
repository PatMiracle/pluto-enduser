"use client";

import { Alert } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/context/ModalProvider";
import useOptions from "@/hooks/use-options";
import { usePaginatedQuery } from "@/hooks/useApiQuery";
import api from "@/lib/apiClient";
import defaultErrorHandler from "@/lib/error-handler";
import { useUserQuery } from "@/services/user-api";
import useAuthStore from "@/store/AuthStore";
import { useState } from "react";
import { toast } from "sonner";

interface AccountDeletionReason {
  id: string;
  label: string;
  name: string;
}

const DeleteAccount = () => {
  const { data: user } = useUserQuery();
  const { logout } = useAuthStore();
  const { data: reasons } = usePaginatedQuery<
    PaginatedResponse<AccountDeletionReason>
  >("del-account", "/account-deletion-reasons");
  const reasonsOption = useOptions(reasons, "id", "label");

  const [selectedReason, setSelectedReason] = useState("");

  const { openModal, getModalProps, closeModal } = useModal();

  const [deleting, setDeleting] = useState(false);
  const deleteAccount = async () => {
    setDeleting(true);

    try {
      await api.post("/user/account-deletion-requests", {
        deletionReasonCode: selectedReason,
        clientId: user?.id,
        client: user,
      });
      logout();
      window.location.replace("/");
    } catch (error) {
      defaultErrorHandler(error);
    } finally {
      setDeleting(false);
      closeModal();
    }
  };

  return (
    <div className="max-w-lg px-5">
      <p className="text-lg">Delete Account</p>
      <div className="grid gap-2 pt-5">
        <Select onValueChange={(v) => setSelectedReason(v)}>
          <SelectTrigger className="bg-red-light-active-hover *:data-[slot=select-value]:text-red-normal data-placeholder:text-red-normal [&_svg:not([class*='text-'])]:text-red-normal text-red-normal w-full capitalize">
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
              {reasonsOption.map((opt) => (
                <SelectItem
                  key={String(opt.value)}
                  value={String(opt.value)}
                  className="focus:bg-red-normal cursor-pointer capitalize"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="destructive"
          onClick={() => openModal("del-confrim")}
          disabled={!selectedReason}
        >
          Delete Account
        </Button>
        <Alert
          description="Your account will be deleted!"
          {...getModalProps("del-confrim")}
        >
          <Button
            variant={"destructive"}
            disabled={!selectedReason || deleting}
            onClick={deleteAccount}
          >
            {deleting ? "Deleting Account" : "Delete Account"}
          </Button>
        </Alert>
      </div>
    </div>
  );
};

export default DeleteAccount;
