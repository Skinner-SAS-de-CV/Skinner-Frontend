import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { WebVitals } from "../components/_components/web-vitals";
import { GoogleTagManager } from "@next/third-parties/google";
import GtmPageView from "../components/_components/GtmPageView";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skinner",
  description: "Sistemas Inteligentes de Reclutamiento de Empleados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const isProd = process.env.NODE_ENV === "production";

  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="es" className="bg-gray-800">
        {/* Inyecta GTM (script) en <head> optimizado por Next */}
        {isProd && gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        <body className={inter.className}>
          {/* Fallback <noscript> justo dentro de <body> asi es como decia la docuemntacion*/}
          {isProd && gtmId ? (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          ) : null}

          {/* Pageviews en cambios de ruta (SPA) */}
          {isProd && gtmId ? <GtmPageView /> : null}

          {/* Métricas propias */}
          <WebVitals />

          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
