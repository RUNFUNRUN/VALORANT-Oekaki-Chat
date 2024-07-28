import { DonateButton } from './_components/donate-button';
import { OekakiChat } from './_components/oekaki-chat';
import { OpinionBox } from './_components/opinion-box';
import { Share } from './_components/share';

export const runtime = 'edge';

const Home = () => {
  return (
    <>
      <OekakiChat />
      <Share />
      <OpinionBox />
      <DonateButton />
    </>
  );
};

export default Home;
