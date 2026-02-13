import "@workspace/ui/globals.css";

import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills Hub",
  description: "Discover and share AI skills for your assistant",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
