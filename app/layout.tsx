import Header from '@/components/Header/Header';
import type { Metadata } from 'next';

import './globals.css';
import 'modern-normalize';
import { inter } from './fonts';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'TravelTrucks',
  description: 'Campers of your dreams',
  openGraph: {
    title: 'TravelTrucks',
    description: 'Campers of your dreams',
    url: 'https://travel-trucks.vercel.app/',
    siteName: 'TravelTrucks',
    images: [
      {
        url: 'https://travel-trucks.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TravelTrucks',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
