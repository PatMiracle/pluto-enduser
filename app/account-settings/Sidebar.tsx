"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/components/navbar";
import { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

const items = [
  {
    text: "Profile",
    href: "/account-settings/profile",
  },
  {
    text: "Account & Payment",
    href: "/account-settings/payments",
  },
  {
    text: "Security",
    href: "/account-settings/security",
  },
  {
    text: "Legal Agreements",
    href: "/account-settings/legal-agreements",
  },
  {
    text: "Contact Us",
    href: "/account-settings/contact-us",
  },
  {
    text: "Delete Account",
    href: "/account-settings/delete-account",
    icon: <FaRegTrashAlt className="text-red-normal" />,
  },
];

type Props = {};

export default function AccountSettingsSidebar() {
  const pathname = usePathname();

  const { setOpenMobile, isMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar style={{ top: NAVBAR_HEIGHT }}>
      <SidebarContent>
        <SidebarGroup>
          {isMobile && (
            <SidebarTrigger asChild>
              <MdMenu className="text-primary hover:text-primary mx-auto block size-7" />
            </SidebarTrigger>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-5 pt-5">
              {items.map((item) => {
                const isActive = pathname === item.href;
                const isDelete = item.text == "Delete Account";
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "py-6 pl-4 text-lg",
                        isDelete &&
                          isActive &&
                          "data-[active=true]:bg-red-light-active-hover",
                        isDelete && "hover:bg-red-light-active-hover",
                      )}
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.text}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
