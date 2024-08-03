import { DonateButton } from '@/components/donate-button';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { News } from '@/components/news';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className={cn(inter.className, 'min-h-dvh flex flex-col')}>
      <News />
      <Header />
      <main>
        {children}
        <DonateButton />
        <Toaster />
      </main>
      <Footer />
    </body>
  );
};

export default Layout;
