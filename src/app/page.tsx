import { DonateButton } from './_components/donate-button';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { OekakiChat } from './_components/oekaki-chat';
import { OpinionBox } from './_components/opinion-box';
import { Share } from './_components/share';

export const runtime = 'edge';

const Home = () => {
  return (
    <main>
      <Header />
      <OekakiChat />
      <Share />
      <OpinionBox />
      <DonateButton />
      <Footer />
    </main>
  );
};

export default Home;
