import type { AsciiData, Height } from '@/types';

export const createAscii = (
  asciiData: AsciiData,
  width: number,
  height: Height,
) => {
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

export const flattenArray = (array: boolean[][]): boolean[] => array.flat();

export const unflattenArray = (
  array: boolean[],
  rows = 13,
  cols = 27,
): boolean[][] => {
  const result: boolean[][] = [];
  for (let i = 0; i < rows; i++) {
    result.push(array.slice(i * cols, (i + 1) * cols));
  }
  return result;
};
