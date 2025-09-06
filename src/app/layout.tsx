import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you need
});

export const metadata: Metadata = {
  title: "Don't Say The Same Thing As Me",
  description: "A game where you cannot say the same thing as the computer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-background antialiased relative min-h-[100vh]`}
      >
        {children}
        <p className="absolute bottom-0 right-0">@{new Date().getFullYear()} Abainza. All rights reserved.</p>
        <Toaster />
      </body>
    </html>
  );
}
