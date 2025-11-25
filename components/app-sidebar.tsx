"use client";

import { usePathname } from "next/navigation";
import {
  MdContactSupport,
  MdDashboard,
  MdLocationOn,
  MdOutlineContactSupport,
  MdOutlineDashboard,
  MdOutlineLocationOn,
  MdOutlineStorefront,
  MdStorefront,
} from "react-icons/md";
import orderActive from "@/public/icons/orders-active.svg";
import orderInactive from "@/public/icons/orders-inactive.svg";
import personRaisedHand from "@/public/icons/person-raised-hand.svg";
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
} from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "./navbar";

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
    activeIcon: <MdStorefront />,
    inactiveIcon: <MdOutlineStorefront />,
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
    activeIcon: <Image src={personRaisedHand} alt="" width={24} height={24} />,
    inactiveIcon: (
      <Image src={personRaisedHand} alt="" width={24} height={24} />
    ),
  },
];

type Props = {};

export default function AppSidebar({}: Props) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" style={{ top: NAVBAR_HEIGHT }}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.href;
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
    </Sidebar>
  );
}
