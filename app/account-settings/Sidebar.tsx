"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import useAuthStore from "@/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MdMenu } from "react-icons/md";

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
];

type Props = {};

export default function AccountSettingsSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

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
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="py-6 pl-4 text-lg"
                    >
                      <Link href={item.href}>{item.text}</Link>
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
