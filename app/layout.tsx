import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leitura Confortável | Artigos acadêmicos",
  description: "Leia artigos acadêmicos traduzidos, destaque trechos e continue em qualquer dispositivo.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
