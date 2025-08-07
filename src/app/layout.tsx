import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Mitr } from "next/font/google"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


const mitr = Mitr({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  display: "swap",
  variable: "--font-mitr",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Wiseup - Take Control of Your Finances",
  description: "Wiseup is a powerful expense tracking application designed to help you manage your finances effortlessly. With a wide variety of interactive charts and analytics, you can gain deep insights into your spending habits. Set up monthly subscriptions to automatically detect recurring payments and stay on top of your budget. Whether you're looking to save more, track expenses, or analyze your financial trends, Wiseup provides all the tools you need to achieve your financial goals.",
  icons: {
    icon: "/Logo.svg",
  },
  openGraph: {
    title: "Wiseup - Take Control of Your Finances",
    description: "Wiseup is a powerful expense tracking application designed to help you manage your finances effortlessly. With a wide variety of interactive charts and analytics, you can gain deep insights into your spending habits. Set up monthly subscriptions to automatically detect recurring payments and stay on top of your budget. Whether you're looking to save more, track expenses, or analyze your financial trends, Wiseup provides all the tools you need to achieve your financial goals.",
    images: [
      {
        url: "/Logo.svg",
        width: 1200,
        height: 630,
        alt: "Wiseup Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wiseup - Take Control of Your Finances",
    description: "Wiseup is a powerful expense tracking application designed to help you manage your finances effortlessly. With a wide variety of interactive charts and analytics, you can gain deep insights into your spending habits. Set up monthly subscriptions to automatically detect recurring payments and stay on top of your budget. Whether you're looking to save more, track expenses, or analyze your financial trends, Wiseup provides all the tools you need to achieve your financial goals.",
    images: ["/Logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${geistSans.variable} ${mitr.variable} ${geistMono.variable} antialiased`}
          >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
