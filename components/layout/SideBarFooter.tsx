import { memo } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import AuthButton from "@/components/auth/AuthButton";
import { auth } from "@/auth";

const SideBarFooter = async () => {
  const session = await auth();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="bg-sidebar-accent hover:bg-gray-200" size="lg" asChild>
          <AuthButton session={session!} />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default memo(SideBarFooter);
