"use client";

import menuIcon from "@/public/icons/menu.svg";
import Image from "next/image";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import {
  MdKeyboardArrowDown,
  MdMenu,
  MdNotificationsNone,
} from "react-icons/md";
import logo from "@/public/images/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ReactNode } from "react";
import Link from "next/link";
import Notifications from "./notifications";
import useAuthStore from "@/store/AuthStore";

export const NAVBAR_HEIGHT = "3.5rem";

export default function Navbar() {
  const { open } = useSidebar();

  const { user } = useAuthStore();
  return (
    <div
      className="bg-white-normal fixed top-0 z-20 flex h-14 w-full items-center justify-between px-5"
      style={{ boxShadow: "0px 4px 4px 0px #00000040", height: NAVBAR_HEIGHT }}
    >
      <div className="flex items-center gap-5">
        <SidebarTrigger asChild title="CTRL + B">
          {open ? (
            <MdMenu
              title="CTRL + B"
              className="text-primary hover:text-primary size-7"
            />
          ) : (
            <div title="CTRL + B">
              <Image src={menuIcon} alt="" className="size-6" />
            </div>
          )}
        </SidebarTrigger>
        <Image src={logo} alt="Pluto" width={100} />
      </div>

      {user && (
        <div className="ml-auto flex gap-3">
          <Notifications />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-green-light hover:bg-green-normal group flex h-8 w-14 cursor-pointer items-center gap-1 rounded-full pr-2">
                <Avatar>
                  {user?.photoURL ? (
                    <>
                      <AvatarImage src={user?.photoURL} />
                      <AvatarFallback>
                        {user?.firstName.slice(0, 1)}
                        {user?.lastName.slice(0, 1)}
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>
                      {user?.firstName.slice(0, 1)} {user?.lastName.slice(0, 1)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <MdKeyboardArrowDown
                  className="text-green-normal group-hover:text-white-normal shrink-0 transition-colors duration-200"
                  size={16}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-green-light-hover mr-5 min-w-[200px] rounded-sm rounded-tr-2xl">
              <DropDownItem>
                <div className="flex gap-1">
                  <Avatar>
                    {user?.photoURL ? (
                      <>
                        <AvatarImage src={user?.photoURL} />
                        <AvatarFallback>
                          {user?.firstName.slice(0, 1)}
                          {user?.lastName.slice(0, 1)}
                        </AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback>
                        {user?.firstName.slice(0, 1)}{" "}
                        {user?.lastName.slice(0, 1)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-[13px]">{`${user?.firstName} ${user?.lastName}`}</p>
                    <p className="text-white-darker text-xs">{user?.email}</p>
                  </div>
                </div>
              </DropDownItem>
              <DropdownMenuSeparator className="bg-green-normal h-[0.5px]" />
              <DropDownItem href="/account-settings/profile">
                My Profile
              </DropDownItem>
              <DropDownItem href="/account-settings/payments">
                Account & Payment
              </DropDownItem>
              <DropDownItem href="/account-settings/security">
                Security
              </DropDownItem>
              <DropdownMenuSeparator className="bg-green-normal" />
              <DropDownItem href="/account-settings/legal-agreements">
                Legal Agreements
              </DropDownItem>
              <DropDownItem href="/account-settings/contact-us">
                Contact Us
              </DropDownItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

function DropDownItem({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  return (
    <DropdownMenuItem className="focus:text-white-darker focus:bg-transparent">
      {href ? (
        <Link href={href} className="w-full">
          {children}
        </Link>
      ) : (
        children
      )}
    </DropdownMenuItem>
  );
}
