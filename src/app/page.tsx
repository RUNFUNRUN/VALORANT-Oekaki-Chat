import { Lobster } from 'next/font/google';
import Link from 'next/link';
import { DonateButton } from './_components/DonateButton';
import { Header } from './_components/Header';
import { OekakiChat } from './_components/OekakiChat';
import { OpinionBox } from './_components/OpinionBox';
import { Share } from './_components/Share';

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
      <footer className='mb-2 mt-auto text-center text-xl font-bold'>
        <p>
          Made by RUNFUNRUN |{' '}
          <Link
            href='https://twitter.com/GRAPH_fps'
            className='text-blue-500 underline'
          >
            Twitter
          </Link>{' '}
          |{' '}
          <Link
            href='https://github.com/RUNFUNRUN/VALORANT-Oekaki-Chat'
            className='text-blue-500 underline'
          >
            GitHub
          </Link>
        </p>
      </footer>
    </main>
  );
};

export default Home;
