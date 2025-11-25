"use client";
import { useUserQuery } from "@/services/user-api";
import useAuthStore from "@/store/AuthStore";
import { redirect } from "next/navigation";

export default function Home() {
  const { isError, data: user } = useUserQuery();
  const { logout } = useAuthStore();

  if (isError) {
    logout().then(() => redirect("/login"));
  }

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="border-green-normal h-14 w-14 animate-spin rounded-full border-0 border-y-2"></div>
      <p>Loading Application...</p>
    </div>
  );
}
