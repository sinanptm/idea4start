import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/layout/theameProvider";
import SideBarFooter from "@/components/layout/SideBarFooter";
import QueryProvider from "@/components/layout/QueryProvider";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "@/components/layout/Sidebar";
import { SessionProvider } from "next-auth/react";
import { RootLayoutProps } from "@/types/props";
import NavBar from "@/components/layout/NavBar";
import Toaster from "@/components/ui/toaster";
import TokenSetter from "@/components/auth/TokenSetter";

const LayoutProviders = ({ children }: RootLayoutProps) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                <QueryProvider>
                    <NuqsAdapter>
                        <SidebarProvider>
                            <Sidebar />
                            <SidebarInset>
                                <NavBar Footer={<SideBarFooter />} />
                                <TokenSetter />
                                {children}
                                <Analytics mode="auto" />
                                <Toaster />
                            </SidebarInset>
                        </SidebarProvider>
                    </NuqsAdapter>
                </QueryProvider>
            </SessionProvider>
        </ThemeProvider>
    );
};

export default LayoutProviders;