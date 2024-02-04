import { AsciiData } from '@/types';
import { useTheme } from 'next-themes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const Piece = ({
  active,
  xIndex,
  yIndex,
  asciiData,
  setAsciiData,
}: {
  active: boolean;
  xIndex: number;
  yIndex: number;
  asciiData: AsciiData;
  setAsciiData: Dispatch<SetStateAction<AsciiData>>;
}) => {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(theme);

  useEffect(() => {
    if (theme !== 'system') {
      setCurrentTheme(theme);
    } else if (theme === 'system') {
      setCurrentTheme(systemTheme);
    }
  }, [theme, systemTheme]);

  const handleClick = () => {
    const newAsciiData = [...asciiData];
    newAsciiData[yIndex][xIndex] = !newAsciiData[yIndex][xIndex];
    setAsciiData(newAsciiData);
  };
  if (active) {
    return (
      <button
        className={`${currentTheme === 'dark' ? 'bg-gray-300' : 'bg-white'} w-[15px] h-[15px] md:w-[30px] sm:h-[30px] lg:w-[40px] lg:h-[40px] m-0 border border-black`}
        onClick={handleClick}
      ></button>
    );
  }
  return (
    <button
      className={`${currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'} w-[15px] h-[15px] md:w-[30px] sm:h-[30px] lg:w-[40px] lg:h-[40px] m-0 border border-black`}
      onClick={handleClick}
    ></button>
  );
};
