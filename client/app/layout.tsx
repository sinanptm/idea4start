import LayoutProviders from "@/components/layout/LayoutProviders";
import { RootLayoutProps } from "@/types/props";
import { Fira_Code } from "next/font/google";
import "../styles/globals.css";
import { memo } from "react";
import Script from "next/script";
const firaCode = Fira_Code({ subsets: ['latin'] });

export { metadata } from "./metadata";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4533942133041461"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${firaCode.className} antialiased`}
      >
        <LayoutProviders>
          {children}
        </LayoutProviders>
      </body>
    </html >
  );
};

export default memo(RootLayout);