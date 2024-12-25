import { NextAuthProvider } from '@/components/providers/next-auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'min-h-dvh flex flex-col')}>
        <NextAuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default Layout;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: 'VALORANT Oekaki Chat',
  description:
    'VALORANT ASCII art generator | "Oekaki" means "drawing" in Japanese.',
  openGraph: {
    images: '/og.png',
  },
  twitter: {
    images: '/og.png',
  },
  manifest: '/manifest.json',
};
