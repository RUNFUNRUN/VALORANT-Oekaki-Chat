import type { AsciiData, DragMode, DrawingMode, Height } from '@/types';
import { type Dispatch, useEffect, useState } from 'react';
import { Piece } from './piece';

export const Canvas = ({
  asciiData,
  setAsciiData,
  width,
  height,
  drawingMode,
  dragMode,
}: {
  asciiData: AsciiData;
  setAsciiData: Dispatch<AsciiData>;
  width: number;
  height: Height;
  drawingMode: DrawingMode;
  dragMode: DragMode;
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (drawingMode === 'drag') {
      const handleWindowMouseUp = () => {
        setIsMouseDown(false);
      };

      window.addEventListener('mouseup', handleWindowMouseUp);

      return () => {
        window.removeEventListener('mouseup', handleWindowMouseUp);
      };
    }
  }, [drawingMode]);

  return (
    <div className='min-w-[405px] md:min-w-[810px] lg:min-w-[1080px] text-center'>
      {asciiData.map((row, i) => {
        if (i >= height) {
          return null;
        }
        return (
          <div key={i.toString()} className='h-[15px] md:h-[30px] lg:h-[40px]'>
            {row.map((active, j) => {
              if (j >= width) {
                return null;
              }
              return (
                <Piece
                  key={j.toString()}
                  active={active}
                  xIndex={j}
                  yIndex={i}
                  asciiData={asciiData}
                  setAsciiData={setAsciiData}
                  isMouseDown={isMouseDown}
                  setIsMouseDown={setIsMouseDown}
                  drawingMode={drawingMode}
                  dragMode={dragMode}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
