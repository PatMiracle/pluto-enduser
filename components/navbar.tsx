"use client";

import menuIcon from "@/public/icons/menu.svg";
import Image from "next/image";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { MdMenu } from "react-icons/md";
import logo from "@/public/images/logo.svg";

export const NAVBAR_HEIGHT = "3.5rem";

export default function Navbar() {
  const { open } = useSidebar();
  return (
    <div
      className="bg-white-normal fixed top-0 z-20 flex h-14 w-full items-center justify-between px-5"
      style={{ boxShadow: "0px 4px 4px 0px #00000040", height: NAVBAR_HEIGHT }}
    >
      <div className="flex items-center gap-5">
        <SidebarTrigger asChild>
          {open ? (
            <MdMenu className="text-primary hover:text-primary size-7" />
          ) : (
            <div>
              <Image src={menuIcon} alt="" className="size-6" />
            </div>
          )}
        </SidebarTrigger>
        <Image src={logo} alt="Pluto" width={100} />
      </div>
      <div></div>
    </div>
  );
}
