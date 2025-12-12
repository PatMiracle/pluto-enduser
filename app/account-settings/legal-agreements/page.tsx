"use client";

import { TableSkeleton } from "@/components/data-table";
import { LicenseType, useLicenses } from "@/services/licenses";
import useAuthStore from "@/store/AuthStore";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ORDER: LicenseType[] = [
  "END_USER_LICENSE_AGREEMENT",
  "PAYMENT_TERMS_AND_CONDITIONS",
  "TERMS_AND_CONDITIONS",
  "PRIVACY_POLICY",
  "SUBSCRIPTION_RENEWAL",
  "WASTE_STORAGE_AND_TOOLS_REPLACEMENT",
] as const;

const LegalAgreements = () => {
  const { user } = useAuthStore();
  const { data, isPending } = useLicenses({
    stateId: user!.stateWasteManagementBoardId as number,
  });

  const licenses = data?.sort(
    (a, b) => ORDER.indexOf(a.licenseType) - ORDER.indexOf(b.licenseType),
  );

  const [activeLicense, setActiveLicense] = useState<LicenseType>();

  const currentLicense = licenses?.find((v) => v.licenseType === activeLicense);

  if (isPending) {
    return (
      <div className="grid gap-4 px-4 md:px-10">
        <p className="text-lg">Legal Agreements</p>
        <TableSkeleton rows={3} />
        <p className="text-lg">E-Store & Resources Agreements</p>
        <TableSkeleton rows={2} />
      </div>
    );
  }

  if (activeLicense) {
    return (
      <div className="px-4 md:px-10">
        <button
          className="flex items-center gap-1"
          onClick={() => setActiveLicense(undefined)}
        >
          <MdKeyboardArrowLeft className="text-primary" /> Back
        </button>

        <article className="max-w-3xl py-5 text-justify">
          <h1 className="text-lg">{currentLicense?.title}</h1>
          <div
            className="legal-agreement py-4"
            dangerouslySetInnerHTML={{ __html: currentLicense?.content || "" }}
          />
        </article>
      </div>
    );
  }

  return (
    <div className="grid max-w-2xl gap-4 px-4 pb-10 md:px-10">
      <p className="text-lg">Legal Agreements</p>
      {licenses?.slice(0, 4).map((v) => (
        <LicenseButton
          key={v.licenseId}
          title={v.title}
          open={() => setActiveLicense(v.licenseType)}
        />
      ))}
      <p className="text-lg">E-Store & Resources Agreements</p>
      {licenses?.slice(4, 6).map((v) => (
        <LicenseButton
          key={v.licenseId}
          title={v.title}
          open={() => setActiveLicense(v.licenseType)}
        />
      ))}
    </div>
  );
};

const LicenseButton = ({
  title,
  open,
}: {
  title: string;
  open: () => void;
}) => {
  return (
    <button
      onClick={open}
      className="border-white-dark hover:border-green-light-active flex w-full items-center justify-between rounded-xl border px-4 py-3"
    >
      <span>{title}</span>
      <span className="border-green-light-active text-primary grid size-8 place-content-center rounded-full border text-lg">
        <MdKeyboardArrowRight />
      </span>
    </button>
  );
};

export default LegalAgreements;
