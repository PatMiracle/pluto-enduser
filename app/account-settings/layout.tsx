import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { ModalProvider } from "@/context/ModalProvider";
import AuthLayer from "../(main)/AuthLayer";
import { NAVBAR_HEIGHT } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import AccountSettingsSidebar from "./Sidebar";

type Props = { children: ReactNode };

export default async function layout({ children }: Props) {
  return (
    <SidebarProvider>
      <div
        className="fixed top-0 z-20 flex h-14 w-full items-center justify-between px-5"
        style={{
          boxShadow: "0px 4px 4px 0px #00000040",
          height: NAVBAR_HEIGHT,
        }}
      >
        <p className="text-xl">Account Settings</p>
        <Link href="/dashboard">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-green-normal border-green-light-active hover:bg-red-light hover:border-red-normal hover:text-red-normal size-9 rounded-full border"
          >
            <MdClose />
          </Button>
        </Link>
      </div>
      <AccountSettingsSidebar />
      <SidebarInset>
        <div className="bg-white-normal w-full overflow-y-auto pt-20">
          <AuthLayer>
            <ModalProvider>{children}</ModalProvider>
          </AuthLayer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
