import Image from "next/image";
import logoImg from "@/public/images/logo.svg";
import * as z from "zod";
import { useAccountTypes, useTrackedStates } from "@/services/enum-api";
import useOptions from "@/hooks/use-options";

type Props = {};

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Board({}: Props) {
  const { data: rawTrackedStates } = useTrackedStates();

  const trackedStates = useOptions(
    rawTrackedStates?.data,
    "stateId",
    "stateName",
  );

  const { data: rawAccountTypes } = useAccountTypes();
  const accountTypes = useOptions(
    rawAccountTypes?.data,
    "accountTypeId",
    "accountTypeName",
  );

  return (
    <div className="mx-auto w-11/12 max-w-xl">
      <Image src={logoImg} alt="Pluto Logo" className="mx-auto" />
      <p className="text-blue-normal mt-2 text-center text-3xl sm:text-4xl">
        Register with State Waste Management Board
      </p>

      <div className="pt-4"></div>
    </div>
  );
}
