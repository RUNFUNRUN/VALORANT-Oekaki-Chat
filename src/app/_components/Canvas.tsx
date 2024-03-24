import type { AsciiData, Height } from '@/types';
import type { Dispatch, SetStateAction } from 'react';
import { Piece } from './Piece';

export const Canvas = ({
  asciiData,
  setAsciiData,
  width,
  height,
}: {
  asciiData: AsciiData;
  setAsciiData: Dispatch<SetStateAction<AsciiData>>;
  width: number;
  height: Height;
}) => {
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
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
