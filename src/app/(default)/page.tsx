import { OpinionBox } from '@/components/opinion-box';
import { OekakiChat } from './_components/oekaki-chat';
import { SocialMedia } from './_components/social-media';

const Home = () => {
  return (
    <>
      <OekakiChat />
      <SocialMedia />
      <OpinionBox />
    </>
  );
};

export default Home;
