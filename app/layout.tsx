import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/layout/theame-provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Sidebar from "@/components/layout/Sidebar";
import NavBar from "@/components/layout/NavBar";
import { RootLayoutProps } from "@/types/props";
import Toaster from "@/components/ui/toaster";
import { Fira_Code } from "next/font/google";
import "../styles/globals.css";

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
          <SidebarProvider>
            <Sidebar />
            <SidebarInset>
              <NavBar />
              <NuqsAdapter>
                {children}
              </NuqsAdapter>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
