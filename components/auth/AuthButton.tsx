"use client";

import { LogOut, User } from "lucide-react";
import { memo } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Session } from "next-auth";
import LoginDialog from "./LoginDialog";
const AuthButton = ({ session }: { session: Session; }) => {
  if (session && session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
              {session.user.image ? (
                <Image
                  src={session.user.image || "/placeholder.svg"}
                  alt={session.user.name || "User profile"}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <div className="bg-blue-500 text-white flex items-center justify-center w-full h-full">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{session.user.name}</span>
              <span className="truncate text-xs hidden" aria-hidden="true" >Signed in</span>
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/profile" prefetch={false} className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <SidebarMenuButton size="lg" className="hover:bg-sidebar-accent">
      <LoginDialog />
    </SidebarMenuButton>
  );
};

export default memo(AuthButton)

