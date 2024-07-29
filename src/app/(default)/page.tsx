import { OpinionBox } from '@/components/opinion-box';
import { OekakiChat } from './_components/oekaki-chat';
import { Share } from './_components/share';

const Home = () => {
  return (
    <>
      <OekakiChat />
      <Share />
      <OpinionBox />
    </>
  );
};

export default Home;
