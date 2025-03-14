import { ThemeProvider } from "@/components/theame-provider";
import { RootLayoutProps } from "@/types/props";
import Sidebar from "@/components/layout/Sidebar";
import { Fira_Code } from "next/font/google";
import NavBar from "@/components/layout/NavBar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar />
            <SidebarInset>
              <NavBar />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
