import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import { ClerkProvider } from "@clerk/nextjs";

const fontPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const fontCaveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SumrEase | Summarize your pdf's",
  description:
    "Tired of slogging through long PDFs? SumrEase makes life easier by giving you quick, clear summaries in just a few seconds! Just upload a PDF, and boom—you get the key points without the fluff.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fontPoppins.variable} ${fontCaveat.variable} font-poppins antialiased`}
        >
          <div className="min-h-screen flex flex-col relative">
            <Header />
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
