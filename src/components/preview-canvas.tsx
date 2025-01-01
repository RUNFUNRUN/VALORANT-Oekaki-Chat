import type { AsciiData } from '@/types';

export const PreviewCanvas = ({
  asciiData,
  height,
}: { asciiData: AsciiData; height: number }) => {
  return (
    <div className='w-[522px] border'>
      {asciiData.map((row, i) => {
        if (i >= height) {
          return null;
        }
        return (
          <div key={i.toString()} className='h-5'>
            {row.map((active, j) => {
              if (active) {
                return (
                  <span
                    key={j.toString()}
                    className='bg-white dark:bg-gray-300 w-5 h-5 m-0 inline-block'
                  />
                );
              }
              return (
                <span
                  key={j.toString()}
                  className='bg-gray-400 dark:bg-gray-600 w-5 h-5 m-0 inline-block'
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
