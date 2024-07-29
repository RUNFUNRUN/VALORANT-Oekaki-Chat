import { OekakiChat } from './_components/oekaki-chat';
import { OpinionBox } from './_components/opinion-box';
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
