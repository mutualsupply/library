"use client";

import { Header } from "../components";
import "../styles/globals.css";
import { Providers } from "./providers";

// export const metadata: Metadata = {
//   title: "Public Assembly - Caisson",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-8">
        <Providers>
          <>
            <Header />
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}
