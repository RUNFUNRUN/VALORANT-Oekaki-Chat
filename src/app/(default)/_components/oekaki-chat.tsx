'use client';

import type {
  AsciiData,
  DragMode,
  DrawingMode,
  Height,
  Resolution,
} from '@/types';
import { useState } from 'react';
import { Buttons } from './buttons';
import { Canvas } from './canvas';
import { Setting } from './setting';

export const OekakiChat = () => {
  const fullhdWidth = 26;
  const stretchedWidth = 27;

  const maxW = fullhdWidth > stretchedWidth ? fullhdWidth : stretchedWidth;
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
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('click');
  const [dragMode, setDragMode] = useState<DragMode>('pen');
  const [height, setHeight] = useState<Height>(7);

  return (
    <div>
      <Setting
        setResolution={setResolution}
        height={height}
        setHeight={setHeight}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        dragMode={dragMode}
        setDragMode={setDragMode}
        maxH={maxH}
      />
      <Canvas
        asciiData={asciiData}
        setAsciiData={setAsciiData}
        width={resolution === 'fullhd' ? fullhdWidth : stretchedWidth}
        height={height}
        drawingMode={drawingMode}
        dragMode={dragMode}
      />
      <Buttons
        asciiData={asciiData}
        setAsciiData={setAsciiData}
        width={resolution === 'fullhd' ? fullhdWidth : stretchedWidth}
        height={height}
      />
    </div>
  );
};
