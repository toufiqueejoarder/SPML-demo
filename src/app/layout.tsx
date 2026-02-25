import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DemoStateProvider } from "@/contexts/DemoStateContext";
import { Toaster } from "@/components/ui/sonner";
import { DemoIndicator } from "@/components/demo/DemoIndicator";
import { AIChatWidget } from "@/components/shared/AIChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPML - Secure Property Management Limited",
  description: "Next-Gen Real Estate Digital Ecosystem - Empowering transparent, intelligent, and high-conversion property investment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DemoStateProvider>
          {children}
          <DemoIndicator />
          <AIChatWidget />
          <Toaster position="top-right" />
        </DemoStateProvider>
      </body>
    </html>
  );
}
