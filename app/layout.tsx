import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/layout/theameProvider";
import QueryProvider from "@/components/layout/QueryProvider";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "@/components/layout/Sidebar";
import NavBar from "@/components/layout/NavBar";
import { RootLayoutProps } from "@/types/props";
import Toaster from "@/components/ui/toaster";
import { Fira_Code } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

const firaCode = Fira_Code({ subsets: ['latin'] });

export { metadata } from "./metadata";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.className} antialiased`}
      >
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
                    <NavBar />
                    {children}
                    <Analytics mode="auto" />
                    <Toaster />
                  </SidebarInset>
                </SidebarProvider>
              </NuqsAdapter>
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
