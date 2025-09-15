import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./globals.css";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EverLeaf",
  description: "Next.js + Express + Postgres",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*added icon for page*/}
      <link rel="icon" href="./favicon.ico" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <Suspense fallback={<Loading />}>
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
