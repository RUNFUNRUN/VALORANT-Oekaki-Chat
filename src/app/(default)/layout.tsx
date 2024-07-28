import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={cn(inter.className, 'min-h-dvh flex flex-col')}>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
