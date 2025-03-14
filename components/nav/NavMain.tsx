"use client"

import { memo } from "react"
import { SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { NAV_MAIN_ITEMS } from "@/constants"

const NavMain = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {NAV_MAIN_ITEMS.map((link) => (
          <SidebarMenuItem key={link.title}>
            <SidebarMenuButton asChild>
              <a href={link.url} className="flex items-center">
                {link.icon && <link.icon className="mr-2" />}
                <span>{link.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default memo(NavMain)
