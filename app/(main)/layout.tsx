import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from "@/services/user-api";

type Props = { children: ReactNode };

export default async function layout({ children }: Props) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-info"],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider defaultOpen={defaultOpen}>
        <Navbar />
        <AppSidebar />
        <SidebarInset>
          <main className="bg-white-normal fixed top-14 w-full">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
