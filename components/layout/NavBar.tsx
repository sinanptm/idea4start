"use client";

import { memo } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import NavMain from "./NavMain";
import Logo from "../logo/Logo";
import { useSidebar } from "../ui/sidebar";

const NavBar = ({ Footer }: { Footer: React.ReactNode; }) => {
    const { isMobile } = useSidebar();

    if (!isMobile) {
        return (
            <header className="flex h-3 shrink-0 items-center gap-2 px-4 transition-all duration-200 ease-in-out" />
        );
    };

    return (
        <>
            <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-all duration-200 ease-in-out">
                <div className="flex items-center gap-2">
                    <Logo />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-accent hover:text-accent-foreground"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="flex w-[280px] flex-col p-0"
                    >
                        <SheetTitle className="border-b px-4 py-4">
                            <div className="flex items-center gap-2">
                                <Logo />
                            </div>
                        </SheetTitle>
                        <div className="flex-1 overflow-y-auto py-4">
                            <NavMain />
                        </div>
                        <div className="border-t p-4">
                            {Footer}
                        </div>
                        <SheetDescription />
                    </SheetContent>
                </Sheet>
            </header>
            <div className="pb-1 md:pb-0" />
        </>
    );
};

export default memo(NavBar);