import "~/styles/globals.css";

import { Archivo_Narrow } from "next/font/google";
import { type Metadata } from "next";

const archivo = Archivo_Narrow({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HexCode",
  description: "HexCode is a Cloud IDE.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.className}`}>
      <body>{children}</body>
    </html>
  );
}
