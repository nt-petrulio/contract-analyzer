import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContractGuard - AI аналіз договорів",
  description: "AI аналізує твій договір за 2 хвилини. Знаходить ризики, які ти пропустив. Швидше за юриста, дешевше в 10 разів.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
