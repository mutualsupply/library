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
  weight: "300",
  style: "normal",
});
const aspekta = localFont({
  src: [
    {
      path: "../../public/fonts/Aspekta-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aspekta-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Aspekta-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-aspekta",
});
const otBrut = localFont({
  src: "../../public/fonts/OTBrut-Regular.woff2",
  variable: "--font-ot-brut",
  style: "normal",
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
          "font-light",
          aeonikFono.variable,
          aspekta.variable,
          otBrut.variable
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
