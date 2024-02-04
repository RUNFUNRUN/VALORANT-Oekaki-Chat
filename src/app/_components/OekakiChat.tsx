'use client';

import { useState } from 'react';
import { Canvas } from './Canvas';
import { Setting } from './Setting';
import { AsciiData, Height, Resolution } from '@/types';
import { Buttons } from './Buttons';

export const OekakiChat = () => {
  const fullhdWidth = 26;
  const stretchWidth = 27;

  const maxW = fullhdWidth > stretchWidth ? fullhdWidth : stretchWidth;
  const maxH = 13;
  const defaultAsciiData = (): AsciiData => {
    const data = new Array(maxH);
    for (let i = 0; i < maxH; i++) {
      data[i] = new Array(maxW);
      for (let j = 0; j < maxW; j++) {
        data[i][j] = false;
      }
    }
    return data;
  };

  const [asciiData, setAsciiData] = useState<AsciiData>(defaultAsciiData());
  const [resolution, setResolution] = useState<Resolution>('fullhd');
  const [height, setHeight] = useState<Height>(7);

  return (
    <div>
      <Setting setResolution={setResolution} height={height} setHeight={setHeight} />
      <Canvas
        asciiData={asciiData}
        setAsciiData={setAsciiData}
        width={resolution === 'fullhd' ? fullhdWidth : stretchWidth}
        height={height}
      />
      <Buttons
        asciiData={asciiData}
        setAsciiData={setAsciiData}
        width={resolution === 'fullhd' ? fullhdWidth : stretchWidth}
        height={height}
      />
    </div>
  );
};
