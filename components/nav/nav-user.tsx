"use client"

import { Coffee } from "lucide-react"
import { memo } from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const NavUser = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild className="hover:bg-yellow-500  text-yellow-500 hover:text-white">
          <a
            href="https://www.buymeacoffee.com/sinanz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Coffee className="h-5 w-5" />
            <span className="font-medium">Buy sinan a coffee</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default memo(NavUser)

