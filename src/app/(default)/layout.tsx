import { DonateButton } from '@/components/donate-button';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { News } from '@/components/news';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <News />
      <Header />
      <main>
        {children}
        <DonateButton />
        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
