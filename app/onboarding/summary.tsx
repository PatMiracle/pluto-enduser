import { useAccountSetupContext } from "@/context/AccountSetupProvider";
import { cn } from "@/lib/utils";
import {
  useCreateClient,
  useOrgAgencies,
  useOrgMinistries,
} from "@/services/client-account-api";
import { useAccountTypes, useLGAs, useStates } from "@/services/enum-api";
import useAuthStore from "@/store/AuthStore";
import { MdKeyboardArrowDown } from "react-icons/md";
import { sentenceCase } from "../(main)/locations/dropLocationColumns";
import { Button } from "@/components/ui/button";
import { useCreateLocation } from "@/services/client-locations";
import { toast } from "sonner";
import defaultErrorHandler from "@/lib/error-handler";

export default function Summary() {
  const { data, prevStep } = useAccountSetupContext();
  const { user } = useAuthStore();
  const { data: accountTypes } = useAccountTypes();
  const { data: lgas } = useLGAs({ stateId: data.orgState });
  const { data: states } = useStates();
  const { data: orgMinistries } = useOrgMinistries();
  const { data: orgAgencies } = useOrgAgencies(
    {
      orgMinistryId: data.orgMinistryId,
    },
    { enabled: !!data.orgMinistryId },
  );

  const accountCode = accountTypes?.find(
    (e) => e.accountTypeId === data.accountType,
  )?.accountTypeCode;
  const lga = lgas?.data?.find((e) => e.lgaId === data.orgLGA);
  const state = states?.data?.find((e) => e.stateId === data.orgState);
  const stateWasteManagementBoard = states?.data?.find(
    (e) => e.stateId === data.stateWasteManagementBoardId,
  )?.stateName;

  const {
    mutate: updateClient,
    isPending: p1,
    data: clientData,
  } = useCreateClient();
  const { mutate: createLocation, isPending: p2 } = useCreateLocation();

  const isSubmitting = p1 || p2;

  return (
    <div className="mx-auto grid w-11/12 max-w-xl pb-10">
      <div className="grid gap-4">
        <CollapsibleSummary
          title="Section 1 (Email Signup)"
          index={1}
          data={{
            Email: user?.email,
            "Account Type":
              accountTypes?.find((e) => e.accountTypeId === data.accountType)
                ?.accountTypeName ?? "--",
            "State Waste Management Board": stateWasteManagementBoard,
          }}
        />
        {accountCode == "personal" ? (
          <CollapsibleSummary
            title={"Section 2 (Personal Information)"}
            index={2}
            data={{
              "First Name": data.firstName,
              "Last Name": data.lastName,
              "Contact Email": data?.orgEmail,
              "Phone Number": data.orgPhoneNo,
              Address: data.streetAddress,
              "State/LGA":
                sentenceCase(state?.stateName ?? "--") +
                "/" +
                sentenceCase(lga?.lgaName ?? "--"),
            }}
          />
        ) : accountCode == "government" ? (
          <CollapsibleSummary
            title={"Section 2 (Government Information)"}
            index={2}
            data={{
              Ministry: orgMinistries?.find(
                (v) => v.orgMinistryId == data.orgMinistryId,
              )?.orgMinistryName,
              Agency: orgAgencies?.find(
                (v) => v.orgAgencyId == data.orgAgencyId,
              )?.orgAgencyName,
              Jurisdiction: data.orgJurisdiction,
              "Government Official Address": data.streetAddress,
              "Identification Number": data.orgIdentificationNo,
              "First Name": data.orgContactFirstName,
              "Last Name": data.orgContactLastName,
              "Contact Email": data.orgEmail,
              "Phone Number": data.orgPhoneNo,
              Address: data.streetAddress,
              "State/LGA":
                sentenceCase(state?.stateName ?? "--") +
                "/" +
                sentenceCase(lga?.lgaName ?? "--"),
            }}
          />
        ) : (
          <CollapsibleSummary
            title={"Section 2 (Business Information)"}
            index={2}
            data={{
              "Business Name": data.orgName,
              "First Name": data.orgContactFirstName,
              "Last Name": data.orgContactLastName,
              "Contact Email": data.orgEmail,
              "Phone Number": data.orgPhoneNo,
              Address: data.streetAddress,
              "State/LGA":
                sentenceCase(state?.stateName ?? "--") +
                "/" +
                sentenceCase(lga?.lgaName ?? "--"),
            }}
          />
        )}

        <CollapsibleSummary
          title={"Section 3 (Pickup Information)"}
          index={3}
          data={{
            "Locations Added":
              (data.locations?.length ?? 0) +
              " location" +
              (data.locations?.length === 1 ? "" : "s") +
              " added",
          }}
        />
      </div>
      <div className="flex justify-center gap-5 py-10">
        <Button className="min-w-24" onClick={prevStep} disabled={isSubmitting}>
          Previous
        </Button>
        <Button
          className="w-24"
          onClick={() => {
            const { locations, ...accountInfo } = data;
            updateClient(accountInfo, {
              onSuccess: () => {
                toast.success("Updated Profile Details");
                if (locations && locations?.length > 0)
                  toast.info("adding locations...");
              },
              onError: (e) => defaultErrorHandler(e),
            });

            locations?.map(async (e, i) => {
              createLocation(e, {
                onSuccess: () => {
                  toast.success(`Added location ${i + 1}`);
                },
                onError: (e) => defaultErrorHandler(e),
              });
            });

            if (clientData) {
              window.location.replace("/dashboard");
            }
          }}
          disabled={isSubmitting}
        >
          Complete
        </Button>
      </div>
    </div>
  );
}

function CollapsibleSummary({
  index,
  title,
  data,
}: {
  index: number;
  title: string;
  data: Record<string, string | number | undefined>;
}) {
  return (
    <details className="group bg-green-light rounded-lg px-3">
      <summary className="flex cursor-pointer list-none items-center gap-2 py-3">
        <span className="bg-primary text-white-normal grid size-6 place-content-center rounded-full text-sm">
          {index}
        </span>
        <span className="lg:text-lg">{title}</span>

        <MdKeyboardArrowDown
          className="text-green-normal ml-auto text-lg transition-all duration-300 group-open:rotate-180"
          size={24}
        />
      </summary>
      <div className="pb-1">
        {Object.entries(data).map((e) => {
          return (
            <div key={e[0]} className="py-1">
              <p className="text-green-dark text-sm">{e[0]}</p>
              <p
                className={cn(
                  e[1] && !e[1].toString().includes("@") && "capitalize",
                )}
              >
                {e[1] || "--"}
              </p>
            </div>
          );
        })}
      </div>
    </details>
  );
}
