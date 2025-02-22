import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // ✅ Importa Toaster

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skinner",
  description: "Sistemas Inteligentes de Reclutamiento de Empleados.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" /> {/* ✅ Ahora está dentro del body */}
      </body>
    </html>
  );
}
