import {
  LabeledInput,
  LabeledPhoneField,
  LabeledSelect,
} from "@/components/LabeledFields";
import { Button } from "@/components/ui/button";
import { useAccountSetupContext } from "@/context/AccountSetupProvider";
import useOptions from "@/hooks/use-options";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import { useLGAs, useStates } from "@/services/enum-api";
import { MdApartment, MdCottage, MdMailOutline } from "react-icons/md";
import { toast } from "sonner";
import * as z from "zod";

export default function BusinessDetails() {
  const { data, setData, nextStep, prevStep } = useAccountSetupContext();

  const { data: rawStates } = useStates();
  const states = useOptions(rawStates?.data, "stateId", "stateName");

  const { data: rawLGAs } = useLGAs(
    { stateId: data.orgState },
    { enabled: !!data.orgState },
  );
  const lgas = useOptions(rawLGAs?.data, "lgaId", "lgaName");

  return (
    <div className="mx-auto w-11/12 max-w-xl">
      <p className="text-blue-normal text-center text-3xl sm:text-4xl">
        Business Account
      </p>

      <div className="grid gap-4 pt-10">
        <p className="text-sm">Business Information</p>
        <LabeledInput
          value={data.orgName}
          onChange={(e) => setData({ orgName: e.target.value })}
          label="Business name"
          placeholder="Enter business name"
        />
        <LabeledInput
          value={data.streetAddress}
          onChange={(e) => setData({ streetAddress: e.target.value })}
          label="Business Address"
          placeholder="Enter business address"
        />
        <div className="grid grid-cols-2 gap-4">
          <LabeledSelect
            options={states}
            value={data.orgState}
            onSelect={(v) =>
              setData({ orgState: v as number, orgLGA: undefined })
            }
            placeholder="State"
            label="State"
            iconLeft={<MdApartment />}
          />
          <LabeledSelect
            options={lgas}
            value={data.orgLGA}
            onSelect={(v) => setData({ orgLGA: v as number })}
            label="LGA"
            placeholder="LGA"
            disabled={!data.orgState}
            iconLeft={<MdCottage />}
          />
        </div>
        <p className="mt-2 text-sm">Business Contact Details</p>
        <LabeledInput
          value={data.orgContactFirstName}
          onChange={(e) => setData({ orgContactFirstName: e.target.value })}
          label="First Name"
          placeholder="Enter your first name"
        />
        <LabeledInput
          value={data.orgContactLastName}
          onChange={(e) => setData({ orgContactLastName: e.target.value })}
          label="Last Name"
          placeholder="Enter your last name"
        />
        <LabeledPhoneField
          value={data.orgPhoneNo}
          onChange={(e) => setData({ orgPhoneNo: e.target.value })}
          label="Phone Number"
          placeholder="08043614251"
        />
        <LabeledInput
          value={data.orgEmail}
          onChange={(e) => setData({ orgEmail: e.target.value })}
          label="Email"
          placeholder="Enter your Email"
          iconLeft={<MdMailOutline />}
        />

        <div className="flex justify-center gap-5 py-10">
          <Button className="min-w-24" onClick={prevStep}>
            Previous
          </Button>
          <Button
            className="w-24"
            disabled={
              !data.orgName ||
              !data.streetAddress ||
              !data.orgState ||
              !data.orgLGA ||
              !data.orgContactFirstName ||
              !data.orgContactLastName ||
              !data.orgPhoneNo ||
              !data.orgName ||
              !data.orgEmail
            }
            onClick={() => {
              const phone = toNigeriaIntlFormat(data.orgPhoneNo!);
              if (!phone) {
                toast.error("Enter a valid Nigerian phone number");
                return;
              }

              if (z.email().safeParse(data.orgEmail).error) {
                toast.error("Enter valid email");
                return;
              }

              setData({ orgPhoneNo: phone });
              nextStep();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
