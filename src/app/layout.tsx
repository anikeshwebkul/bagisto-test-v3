import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  AppWrapper,
  ReduxProvider,
  ThemeProvider,
  ToastProvider,
  SessionProvider,
} from "@/providers";
import { generateMetadataForPage } from "@utils/helper";
import { staticSeo } from "@utils/metadata";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SpeculationRules } from "@components/theme/SpeculationRules";

export const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-outfit",
  display: "optional",
  preload: true,
});

export async function generateMetadata() {
  return generateMetadataForPage("", staticSeo.default);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SessionProvider>
            <ToastProvider>
              <ReactQueryProvider>
                <ReduxProvider>
                  <Navbar />
                  <AppWrapper>{children}</AppWrapper>
                  <Footer />
                </ReduxProvider>
              </ReactQueryProvider>
            </ToastProvider>
          </SessionProvider>
           <SpeculationRules />
        </ThemeProvider>
      </body>
    </html>
  );
}
