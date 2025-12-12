"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  MdContactSupport,
  MdDashboard,
  MdLocationOn,
  MdLogout,
  MdMenu,
  MdOutlineContactSupport,
  MdOutlineDashboard,
  MdOutlineLocationOn,
  MdOutlineQuiz,
  MdOutlineStorefront,
  MdQuiz,
  MdStorefront,
} from "react-icons/md";
import orderActive from "@/public/icons/orders-active.svg";
import orderInactive from "@/public/icons/orders-inactive.svg";
import personRaisedHand from "@/public/icons/person-raised-hand.svg";
import personRaisedHandFilled from "@/public/icons/person-raised-hand-filled.svg";
import storefrontFilled from "@/public/icons/mdi--storefront.svg";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "./navbar";
import useAuthStore from "@/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const items = [
  {
    text: "Dashboard",
    href: "/dashboard",
    activeIcon: <MdDashboard />,
    inactiveIcon: <MdOutlineDashboard />,
  },
  {
    text: "Locations",
    href: "/locations",
    activeIcon: <MdLocationOn />,
    inactiveIcon: <MdOutlineLocationOn />,
  },
  {
    text: "Requests",
    href: "/requests",
    activeIcon: <Image src={orderActive} alt="" width={24} height={24} />,
    inactiveIcon: <Image src={orderInactive} alt="" width={24} height={24} />,
  },
  {
    text: "Rewards",
    href: "/rewards",
    activeIcon: <Image src={storefrontFilled} alt="" width={24} height={24} />,
    inactiveIcon: <MdStorefront />,
  },
  {
    text: "Services",
    href: "/services",
    activeIcon: <MdContactSupport />,
    inactiveIcon: <MdOutlineContactSupport />,
  },
  {
    text: "Help Desk",
    href: "/help-desk",
    activeIcon: (
      <Image src={personRaisedHandFilled} alt="" width={24} height={24} />
    ),
    inactiveIcon: (
      <Image src={personRaisedHand} alt="" width={24} height={24} />
    ),
  },
];

type Props = {};

export default function AppSidebar({}: Props) {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  const { setOpenMobile, isMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar collapsible="icon" style={{ top: NAVBAR_HEIGHT }}>
      <SidebarContent>
        <SidebarGroup>
          {isMobile && (
            <SidebarTrigger asChild>
              <MdMenu className="text-primary hover:text-primary mx-auto block size-7" />
            </SidebarTrigger>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.includes(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <span className="text-green-normal shrink-0 text-2xl">
                          {isActive ? item.activeIcon : item.inactiveIcon}
                        </span>

                        <span className="text-base">{item.text}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter style={{ paddingBottom: NAVBAR_HEIGHT }}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname == "/faqs"}>
              <Link href="/faqs">
                <span className="text-green-normal shrink-0 text-2xl">
                  {pathname == "/faqs" ? <MdQuiz /> : <MdOutlineQuiz />}
                </span>
                <span className="text-base">FAQs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                logout();
                queryClient.invalidateQueries();
              }}
            >
              <span className="text-green-normal shrink-0 text-2xl">
                <MdLogout className="text-green-normal shrink-0 text-2xl" />
              </span>
              <span className="text-base">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
