import { cn } from '@/lib/utils';
import { AsciiData } from '@/types';

export const PreviewCanvas = ({
  asciiData,
  width,
  height,
}: { asciiData: AsciiData; width: number; height: number }) => {
  return (
    <div className={cn(width === 27 ? 'w-[542px]' : 'w-[522px]', 'border')}>
      {asciiData.map((row, i) => {
        if (i >= height) {
          return null;
        }
        return (
          <div key={i.toString()} className='h-5'>
            {row.map((active, j) => {
              if (j >= width) {
                return null;
              }
              if (active) {
                return (
                  <button
                    key={j.toString()}
                    disabled
                    className='bg-white dark:bg-gray-300 w-5 h-5 m-0'
                  />
                );
              }
              return (
                <button
                  key={j.toString()}
                  disabled
                  className='bg-gray-400 dark:bg-gray-600 w-5 h-5 m-0'
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
