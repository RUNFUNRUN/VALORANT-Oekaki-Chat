import { AsciiData, Height } from '@/types';

export const createAscii = (asciiData: AsciiData, width: number, height: Height) => {
  const grayChar = '░';
  const whiteChar = '█';
  let content = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      content += asciiData[i][j] === false ? grayChar : whiteChar;
    }
  }
  return content;
};
