import { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "utils";
import { Header } from "../components/Header";
import { Providers } from "../components/providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Mutual Supply",
  description: "Mutual supplication",
};

const aeonikFono = localFont({
  src: "../../public/fonts/AeonikFonoTRIAL-Light.woff2",
  variable: "--font-aeonik-fono",
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
          aeonikFono.variable
        )}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
