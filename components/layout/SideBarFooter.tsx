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
          <AuthButton session={session} />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default memo(SideBarFooter);




{/* <Link
            href="https://www.buymeacoffee.com/sinanz"
            prefetch={true}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <div className="bg-amber-500 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
              <Coffee className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="font-medium">Buy me a coffee</span>
              <span className="text-xs">@sinanz</span>
            </div>
          </Link> */}
{/* <Link
            href="/share-idea"
            prefetch={true}
            className="flex items-center gap-2"
          >
            <div className="bg-yellow-300 text-black flex aspect-square size-8 items-center justify-center rounded-lg">
              <Lightbulb className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="font-medium">Share Idea</span>
              <span className="text-xs">Create new idea</span>
            </div>
</Link> */}