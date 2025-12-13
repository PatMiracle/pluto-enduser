import Image from "next/image";
import logoImg from "@/public/images/logo.svg";
import * as z from "zod";
import { useAccountTypes, useTrackedStates } from "@/services/enum-api";
import useOptions from "@/hooks/use-options";
import { LabeledInput, LabeledSelect } from "@/components/LabeledFields";
import { MdApartment, MdBadge } from "react-icons/md";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/AuthStore";
import { useAccountSetupContext } from "@/context/AccountSetupProvider";

type Props = {};

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Board({}: Props) {
  const { logout } = useAuthStore();
  const { data: rawTrackedStates } = useTrackedStates();
  const trackedStates = useOptions(rawTrackedStates, "stateId", "stateName");

  const { data: rawAccountTypes } = useAccountTypes();
  const accountTypes = useOptions(
    rawAccountTypes,
    "accountTypeId",
    "accountTypeName",
  );

  const { data, setData, nextStep } = useAccountSetupContext();

  return (
    <div className="mx-auto w-11/12 max-w-xl">
      <Image src={logoImg} alt="Pluto Logo" className="mx-auto" />
      <p className="text-blue-normal mt-2 text-center text-3xl sm:text-4xl">
        Register with State Waste Management Board
      </p>

      <div className="grid gap-4 pt-10">
        <LabeledInput
          label="Country"
          value="Nigeria"
          disabled
          iconLeft={<MdApartment />}
        />
        <LabeledSelect
          label="State Waste Management Board"
          options={trackedStates}
          onSelect={() => {}}
          value={data.stateWasteManagementBoardId}
          disabled={!!data.stateWasteManagementBoardId}
          iconLeft={<MdApartment />}
        />
        <LabeledSelect
          label="Account Type"
          options={accountTypes}
          value={data.accountType}
          onSelect={(v) => setData({ accountType: v as number })}
          placeholder="Select Account Type"
          iconLeft={<MdBadge />}
        />
      </div>

      <div className="flex justify-center gap-5 py-10">
        <Button className="w-24" onClick={logout}>
          Logout
        </Button>
        <Button
          className="w-24"
          disabled={!data.accountType}
          onClick={nextStep}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
