"use client";

import { memo } from "react";
import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { NAV_MAIN_ITEMS } from "@/constants";
import Link from "next/link";

const NavMain = () => {
  const { setOpen } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {NAV_MAIN_ITEMS.map((link) => (
          <SidebarMenuItem key={link.title} onClick={() => setOpen(false)}>
            <SidebarMenuButton asChild>
              <Link
                href={link.url}
                prefetch={true}
                className="flex items-center"
              >
                {link.icon && <link.icon aria-hidden="true" className="mr-2" />}
                <span>{link.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default memo(NavMain);
