import { Anton } from 'next/font/google';
import { ToggleTheme } from './toggle-theme';

const anton = Anton({ weight: '400', subsets: ['latin'] });

export const Header = () => {
  return (
    <header className='bg-red-500 flex'>
      <h1
        className={`text-center font-bold text-6xl py-4 text-white mx-auto ${anton.className}`}
      >
        VALORANT Oekaki Chat
      </h1>
      <div className='mr-6 my-auto'>
        <ToggleTheme />
      </div>
    </header>
  );
};
