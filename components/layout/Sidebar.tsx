import { ComponentProps, memo } from "react";
import SideBarFooter from "./SideBarFooter";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMain from "./NavMain";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Logo from "../logo/Logo";


const Sidebar = ({ ...props }: ComponentProps<typeof SidebarComponent>) => {
  return (
    <SidebarComponent collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                >
                  <Logo />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  );
};

export default memo(Sidebar);