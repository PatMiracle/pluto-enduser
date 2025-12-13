"use client";

import { useClientAccount } from "@/services/client-account-api";
import { useUserQuery } from "@/services/user-api";
import useAuthStore from "@/store/AuthStore";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = { children: ReactNode };

// THIS ENSURES THE USER IS AUTHENTICATED
export default function AuthLayer({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const { isPending, isError, error, data: user } = useUserQuery();
  const { data: clientAccount } = useClientAccount();

  useEffect(() => {
    if (isError && !mounted) {
      setMounted(true);

      const userError = error as any;

      if (userError.status === 401) {
        toast.error("User session expired, redirecting to login.", {
          duration: 5000,
        });
        logout();
      }
    }

    if (user?.needsAccountSetup && pathname !== "/onboarding") {
      window.location.replace("/onboarding");
    }

    if (user && !user.needsAccountSetup && pathname == "/onboarding") {
      window.location.replace("/dashboard");
    }

    const client = clientAccount?.[0];

    if (user && user?.accountType !== "personal" && client) {
      useAuthStore.setState((v) => ({
        ...v,
        user: {
          ...user,
          email: client.orgEmail!,
          phoneNumber: client.orgPhoneNo!,
          lga: client.orgLGA!,
          streetAddress: client.streetAddress!,
          firstName: client.orgContactFirstName!,
          lastName: client.orgContactLastName!,
        },
      }));
    } else {
      useAuthStore.setState((v) => ({
        ...v,
        user,
      }));
    }
  }, [isError, mounted, user, clientAccount?.[0]]);

  if (
    isPending ||
    !user ||
    (user?.accountType !== "personal" && !clientAccount)
  ) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center gap-4">
        <div className="border-green-normal h-14 w-14 animate-spin rounded-full border-0 border-y-2"></div>
        <p>Loading Application...</p>
      </div>
    );
  }

  return <>{children}</>;
}
