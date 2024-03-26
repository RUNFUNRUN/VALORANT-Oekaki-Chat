import { Lobster } from 'next/font/google';
import { DonateButton } from './_components/DonateButton';
import { Header } from './_components/Header';
import { OekakiChat } from './_components/OekakiChat';
import { OpinionBox } from './_components/OpinionBox';
import { Share } from './_components/Share';
import { Footer } from './_components/Footer';

const lobstar = Lobster({ weight: '400', subsets: ['latin'] });

const Home = () => {
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <p className={`text-center mt-4 text-2xl ${lobstar.className}`}>
        &quot;Oekaki&quot; means &quot;drawing&quot; in Japanese.
      </p>
      <OekakiChat />
      <Share />
      <OpinionBox />
      <DonateButton />
      <Footer />
    </main>
  );
};

export default Home;
