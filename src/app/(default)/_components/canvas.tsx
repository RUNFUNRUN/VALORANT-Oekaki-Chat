import { WIDTH } from '@/config';
import type { AsciiData, DragMode, DrawingMode, Height } from '@/types';
import { type Dispatch, useEffect, useState } from 'react';
import { Piece } from './piece';

export const Canvas = ({
  asciiData,
  setAsciiData,
  height,
  drawingMode,
  dragMode,
}: {
  asciiData: AsciiData;
  setAsciiData: Dispatch<AsciiData>;
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
    <div>
      {asciiData.map((row, i) => {
        if (i >= height) {
          return null;
        }
        return (
          <div key={i.toString()} className='h-4 md:h-7 lg:h-10'>
            {row.map((active, j) => {
              if (j >= WIDTH) {
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
