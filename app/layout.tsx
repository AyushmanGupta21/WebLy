import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "WebLy - AI Website Builder",
  description: "Generate, Edit and Explore design with AI, Export code as well",
  icons: {
    icon: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      }
    ],
    apple: '/logo.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#000000',
};

const outfit = Outfit({subsets:['latin']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignInUrl="/workspace" afterSignUpUrl="/workspace">
    <html lang="en" >
      <body
        className={outfit.className}
        suppressHydrationWarning
      >
        <Provider>
          {children}
          <Toaster/>
        </Provider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
