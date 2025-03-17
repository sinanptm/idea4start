import LayoutProviders from "@/components/layout/LayoutProviders";
import { RootLayoutProps } from "@/types/props";
import { Fira_Code } from "next/font/google";
import "../styles/globals.css";
import { memo } from "react";

const firaCode = Fira_Code({ subsets: ['latin'] });

export { metadata } from "./metadata";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.className} antialiased`}
      >
        <LayoutProviders>
          {children}
        </LayoutProviders>
      </body>
    </html >
  );
}

export default memo(RootLayout);