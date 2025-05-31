import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import { ReactScan } from "~/components/react-scan";

export const metadata: Metadata = {
  title: {
    default: "NPJ - FMU",
    template: "%s | NPJ - FMU",
  },
  description: "Sistema de agendamento do NPJ - FMU",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("scroll-smooth antialiased", geist.variable)}
      suppressHydrationWarning
    >
      <ReactScan />
      <body>
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider delayDuration={100}>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
