import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import AuthLayer from "./AuthLayer";

type Props = { children: ReactNode };

export default async function layout({ children }: Props) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Navbar />
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white-normal w-full overflow-y-auto pt-20">
          <AuthLayer>{children}</AuthLayer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
