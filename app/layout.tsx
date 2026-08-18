import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cruzeiro E.C. - Plataforma Oficial",
  description: "Plataforma oficial do Cruzeiro E.C.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className={`${inter.className} bg-[#05070B] text-zinc-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}