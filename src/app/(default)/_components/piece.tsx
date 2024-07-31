import type { AsciiData, DragMode, DrawingMode } from '@/types';
import type { Dispatch } from 'react';

export const Piece = ({
  active,
  xIndex,
  yIndex,
  asciiData,
  setAsciiData,
  isMouseDown,
  setIsMouseDown,
  drawingMode,
  dragMode,
}: {
  active: boolean;
  xIndex: number;
  yIndex: number;
  asciiData: AsciiData;
  setAsciiData: Dispatch<AsciiData>;
  isMouseDown: boolean;
  setIsMouseDown: Dispatch<boolean>;
  drawingMode: DrawingMode;
  dragMode: DragMode;
}) => {
  const toggleAsciiData = () => {
    const newAsciiData = [...asciiData];
    newAsciiData[yIndex][xIndex] = !newAsciiData[yIndex][xIndex];
    setAsciiData(newAsciiData);
  };

  const enableAsciiData = () => {
    const newAsciiData = [...asciiData];
    newAsciiData[yIndex][xIndex] = true;
    setAsciiData(newAsciiData);
  };

  const disableAsciiData = () => {
    const newAsciiData = [...asciiData];
    newAsciiData[yIndex][xIndex] = false;
    setAsciiData(newAsciiData);
  };

  const handleClick = () => {
    if (drawingMode !== 'click') return;
    toggleAsciiData();
  };

  const toggleAsciiDataDrag = () => {
    switch (dragMode) {
      case 'pen':
        enableAsciiData();
        break;
      case 'eraser':
        disableAsciiData();
        break;
    }
  };

  const handleMouseDown = () => {
    if (drawingMode !== 'drag') return;
    setIsMouseDown(true);
    toggleAsciiDataDrag();
  };

  const handleMouseEnter = () => {
    if (drawingMode !== 'drag' || !isMouseDown) return;
    toggleAsciiDataDrag();
  };

  if (active) {
    return (
      <button
        type='button'
        className='bg-white dark:bg-gray-300 w-4 h-4 md:w-7 sm:h-7 lg:w-10 lg:h-10 m-0 border border-black'
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
      />
    );
  }
  return (
    <button
      type='button'
      className='bg-gray-400 dark:bg-gray-600  w-4 h-4 md:w-7 sm:h-7 lg:w-10 lg:h-10 m-0 border border-black'
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    />
  );
};
