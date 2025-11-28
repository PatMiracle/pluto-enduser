"use client";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useUserQuery } from "@/services/user-api";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = { children: ReactNode };

// THIS ENSURES THE USER IS AUTHENTICATED
export default function AuthLayer({ children }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { logout } = useAuthStore();

  const { isPending, isError, error, data: user } = useUserQuery();

  useEffect(() => {
    if (isError && !mounted) {
      setMounted(true);

      const userError = error as any;

      if (userError.status === 401) {
        toast.error("User session expired, redirecting to login.", {
          duration: 5000,
        });
        logout();
        router.replace("/login");
      }
    }
  }, [isError, mounted]);

  if (isPending && !user) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <div className="border-green-normal h-14 w-14 animate-spin rounded-full border-0 border-y-2"></div>
        <p>Loading Application...</p>
      </div>
    );
  }

  return <>{children}</>;
}
