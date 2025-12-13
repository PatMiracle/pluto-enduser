import {
  LabeledInput,
  LabeledPhoneField,
  LabeledSelect,
} from "@/components/LabeledFields";
import { Button } from "@/components/ui/button";
import { useAccountSetupContext } from "@/context/AccountSetupProvider";
import useOptions from "@/hooks/use-options";
import { toNigeriaIntlFormat } from "@/lib/nigerian-intl";
import {
  useOrgAgencies,
  useOrgMinistries,
} from "@/services/client-account-api";
import { useLGAs, useStates } from "@/services/enum-api";
import useAuthStore from "@/store/AuthStore";
import { MdApartment, MdCottage, MdMailOutline } from "react-icons/md";
import { toast } from "sonner";
import * as z from "zod";

export default function GovernmentDetails() {
  const { data, setData, nextStep, prevStep } = useAccountSetupContext();
  const { user } = useAuthStore();

  const { data: rawStates } = useStates();
  const states = useOptions(rawStates?.data, "stateId", "stateName");

  const { data: rawLGAs } = useLGAs(
    { stateId: data.orgState },
    { enabled: !!data.orgState },
  );
  const lgas = useOptions(rawLGAs?.data, "lgaId", "lgaName");
  const { data: orgMinistries } = useOrgMinistries();
  const ministryOptions = useOptions(
    orgMinistries,
    "orgMinistryId",
    "orgMinistryName",
  );
  const { data: orgAgencies } = useOrgAgencies(
    {
      orgMinistryId: data.orgMinistryId,
    },
    { enabled: !!data.orgMinistryId },
  );

  const agencyOptions = useOptions(orgAgencies, "orgAgencyId", "orgAgencyName");

  return (
    <div className="mx-auto w-11/12 max-w-xl">
      <p className="text-blue-normal text-center text-3xl sm:text-4xl">
        Government Account
      </p>

      <div className="grid gap-4 pt-10">
        <p className="text-sm">Government Information</p>
        <LabeledSelect
          options={ministryOptions}
          value={data.orgMinistryId}
          onSelect={(v) =>
            setData({ orgMinistryId: v as number, orgAgencyId: undefined })
          }
          placeholder="Ministry"
          label="Select Ministry"
          iconLeft={<MdApartment />}
        />
        <LabeledSelect
          options={agencyOptions}
          value={data.orgAgencyId}
          onSelect={(v) => setData({ orgAgencyId: v as number })}
          placeholder="Agency Name"
          label="Agency Name"
          iconLeft={<MdApartment />}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <LabeledSelect
            value={data.orgJurisdiction}
            options={[
              { label: "Federal", value: "FEDERAL" },
              { label: "State", value: "STATE" },
              { label: "Local Government", value: "LOCAL_GOVERNMENT" },
            ]}
            onSelect={(v) => setData({ orgJurisdiction: v as string })}
            placeholder="Jurisdiction"
            label="Jurisdiction"
            iconLeft={<MdApartment />}
          />
          <LabeledInput
            value={data.orgIdentificationNo}
            onChange={(e) => setData({ orgIdentificationNo: e.target.value })}
            placeholder="Identification Number"
            label="Identification Number"
          />
        </div>
        <LabeledInput
          value={data.streetAddress}
          onChange={(e) => setData({ streetAddress: e.target.value })}
          label="Government Address"
          placeholder="Enter government official address"
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
            disabled={!data.orgState}
            iconLeft={<MdCottage />}
          />
        </div>
        <p className="mt-2 text-sm">Government Contact Details</p>
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
              !data.orgMinistryId ||
              !data.orgJurisdiction ||
              !data.orgIdentificationNo ||
              !data.orgAgencyId ||
              !data.streetAddress ||
              !data.orgState ||
              !data.orgLGA ||
              !data.orgContactFirstName ||
              !data.orgContactLastName ||
              !data.orgPhoneNo ||
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
