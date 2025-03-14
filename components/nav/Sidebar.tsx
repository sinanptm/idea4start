"use client"

import { ComponentProps, memo } from "react"
import NavUser  from "@/components/nav/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavMain from "./NavMain";
import NavProjects from "./nav-projects";

const Sidebar = ({ ...props }: ComponentProps<typeof SidebarComponent>) => {
  return (
    <SidebarComponent collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  )
}

export default memo(Sidebar)