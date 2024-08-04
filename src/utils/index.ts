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
  cols = 27,
  rows = 13,
): boolean[][] => {
  const result: boolean[][] = [];
  for (let i = 0; i < rows; i++) {
    result.push(array.slice(i * cols, (i + 1) * cols));
  }
  return result;
};

const getUserLocale = (): string => {
  return navigator.language ?? 'en-US';
};

const getUserTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC';
};

export const formatDate = (date: Date): string => {
  const locale = getUserLocale();
  const timeZone = getUserTimeZone();

  return date.toLocaleDateString(locale, {
    timeZone: timeZone,
  });
};
