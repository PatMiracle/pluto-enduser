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
import useAuthStore from "@/store/AuthStore";
import { MdApartment, MdCottage, MdHouse, MdMailOutline } from "react-icons/md";
import { toast } from "sonner";

export default function PersonalDetails() {
  const { data, setData, nextStep, prevStep } = useAccountSetupContext();
  const { user } = useAuthStore();

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
        Personal Account
      </p>

      <div className="grid gap-4 pt-10">
        <p className="text-sm">Personal Contact Details</p>
        <LabeledInput
          value={data.firstName}
          onChange={(e) => setData({ firstName: e.target.value })}
          label="First Name"
          placeholder="Enter your first name"
        />
        <LabeledInput
          value={data.lastName}
          onChange={(e) => setData({ lastName: e.target.value })}
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
          value={user?.email}
          disabled
          label="Email"
          iconLeft={<MdMailOutline />}
        />
        <LabeledInput
          value={data.streetAddress}
          onChange={(e) => setData({ streetAddress: e.target.value })}
          label="Address"
          placeholder="Enter your residential address"
          iconLeft={<MdHouse />}
        />
        <div className="grid grid-cols-2 gap-4">
          <LabeledSelect
            options={states}
            value={data.orgState}
            onSelect={(v) => setData({ orgState: v as number })}
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
            iconLeft={<MdCottage />}
          />
        </div>
      </div>

      <div className="flex justify-center gap-5 py-10">
        <Button className="min-w-24" onClick={nextStep}>
          Previous
        </Button>
        <Button
          className="w-24"
          disabled={
            !data.firstName ||
            !data.lastName ||
            !data.orgPhoneNo ||
            !data.streetAddress ||
            !data.orgState ||
            !data.orgLGA
          }
          onClick={() => {
            const phone = toNigeriaIntlFormat(data.orgPhoneNo!);
            if (!phone) {
              toast.error("Enter a valid Nigerian phone number");
              return;
            }
            setData({ orgEmail: user?.email });
            nextStep();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
