import { Fira_Code } from "next/font/google";
import "../styles/globals.css";

export const firaCode = Fira_Code({ subsets: ['latin'] });

export { metadata } from "./metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
