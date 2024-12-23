'use client';

import { MAX_HEIGHT, WIDTH } from '@/config';
import type { AsciiData, DragMode, DrawingMode, Height } from '@/types';
import { useState } from 'react';
import { Buttons } from './buttons';
import { Canvas } from './canvas';
import { Setting } from './setting';

export const OekakiChat = () => {
  const defaultAsciiData = (): AsciiData => {
    const data = new Array(MAX_HEIGHT);
    for (let i = 0; i < MAX_HEIGHT; i++) {
      data[i] = new Array(WIDTH);
      for (let j = 0; j < WIDTH; j++) {
        data[i][j] = false;
      }
    }
    return data;
  };

  const [asciiData, setAsciiData] = useState<AsciiData>(defaultAsciiData());
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('click');
  const [dragMode, setDragMode] = useState<DragMode>('pen');
  const [height, setHeight] = useState<Height>(7);

  return (
    <div className='w-[416px] md:w-[728px] lg:w-[1040px] mx-auto'>
      <Setting
        height={height}
        setHeight={setHeight}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        dragMode={dragMode}
        setDragMode={setDragMode}
      />
      <Canvas
        asciiData={asciiData}
        setAsciiData={setAsciiData}
        height={height}
        drawingMode={drawingMode}
        dragMode={dragMode}
      />
      <Buttons
        asciiData={asciiData}
        setAsciiData={setAsciiData}
        height={height}
      />
    </div>
  );
};
