import { Lobster } from 'next/font/google';
import { DonateButton } from './_components/donate-button';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { Info } from './_components/info';
import { OekakiChat } from './_components/oekaki-chat';
import { OpinionBox } from './_components/opinion-box';
import { Share } from './_components/share';

export const runtime = 'edge';

const lobstar = Lobster({ weight: '400', subsets: ['latin'] });

const Home = () => {
  return (
    <main>
      <Header />
      <p className={`text-center mt-4 text-2xl ${lobstar.className}`}>
        &quot;Oekaki&quot; means &quot;drawing&quot; in Japanese.
      </p>
      <OekakiChat />
      <Info />
      <Share />
      <OpinionBox />
      <DonateButton />
      <Footer />
    </main>
  );
};

export default Home;
