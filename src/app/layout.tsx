import { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "utils";
import Header from "../components/Header";
import Providers from "../components/Providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Mutual Supply",
  description: "Mutual Supply",
};
const aeonikFono = localFont({
  src: "../../public/fonts/AeonikFonoTRIAL-Light.woff2",
  variable: "--font-aeonik-fono",
});
const aspekta = localFont({
  src: "../../public/fonts/AspektaVF.woff2",
  variable: "--font-aspekta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "p-8",
          "min-h-[calc(100dvh)]",
          "font-sans",
          "flex",
          "flex-col",
          aeonikFono.variable,
          aspekta.variable
        )}
      >
        <Providers>
          <div className={cn("mb-4")}>
            <Header />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
