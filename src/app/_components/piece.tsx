import type { AsciiData, DrawingMode } from '@/types';
import { useTheme } from 'next-themes';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export const Piece = ({
  active,
  xIndex,
  yIndex,
  asciiData,
  setAsciiData,
  isMouseDown,
  setIsMouseDown,
  drawingMode,
}: {
  active: boolean;
  xIndex: number;
  yIndex: number;
  asciiData: AsciiData;
  setAsciiData: Dispatch<SetStateAction<AsciiData>>;
  isMouseDown: boolean;
  setIsMouseDown: Dispatch<boolean>;
  drawingMode: DrawingMode;
}) => {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (theme !== 'system') {
      setCurrentTheme(theme);
    } else if (theme === 'system') {
      setCurrentTheme(systemTheme);
    }
  }, [theme, systemTheme]);

  const toggleAsciiData = () => {
    const newAsciiData = [...asciiData];
    newAsciiData[yIndex][xIndex] = !newAsciiData[yIndex][xIndex];
    setAsciiData(newAsciiData);
  };

  const handleClick = () => {
    if (drawingMode === 'click') {
      toggleAsciiData();
    }
  };

  const handleMouseDown = () => {
    if (drawingMode === 'drag') {
      setIsMouseDown(true);
      toggleAsciiData();
    }
  };

  const handleMouseEnter = () => {
    if (drawingMode === 'drag' && isMouseDown) {
      toggleAsciiData();
    }
  };

  if (active) {
    return (
      <button
        type='button'
        className={`${
          currentTheme === 'dark' ? 'bg-gray-300' : 'bg-white'
        } w-[15px] h-[15px] md:w-[30px] sm:h-[30px] lg:w-[40px] lg:h-[40px] m-0 border border-black`}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
      />
    );
  }
  return (
    <button
      type='button'
      className={`${
        currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
      } w-[15px] h-[15px] md:w-[30px] sm:h-[30px] lg:w-[40px] lg:h-[40px] m-0 border border-black`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    />
  );
};
