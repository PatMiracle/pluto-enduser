"use client";
import { useUserQuery } from "@/services/user-api";
import useAuthStore from "@/store/AuthStore";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function Home() {
  const { isPending, isError, error } = useUserQuery();

  if (isPending) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <div className="border-green-normal h-14 w-14 animate-spin rounded-full border-0 border-y-2"></div>
        <p>Loading Application...</p>
      </div>
    );
  }

  if (isError) {
    redirect("/login");
  }

  return <Link href="/login">Login</Link>;
}
