import { cn } from '@/lib/utils';
import { AsciiData } from '@/types';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const PreviewCanvas = ({
  asciiData,
  width,
  height,
}: { asciiData: AsciiData; width: number; height: number }) => {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (theme !== 'system') {
      setCurrentTheme(theme);
    } else if (theme === 'system') {
      setCurrentTheme(systemTheme);
    }
  }, [theme, systemTheme]);
  return (
    <div className='min-w-[540px] text-center'>
      {asciiData.map((row, i) => {
        if (i >= height) {
          return null;
        }
        return (
          <div key={i.toString()} className='h-[20px]'>
            {row.map((active, j) => {
              if (j >= width) {
                return null;
              }
              if (active) {
                return (
                  <button
                    key={j.toString()}
                    disabled
                    className={cn(
                      currentTheme === 'dark' ? 'bg-gray-300' : 'bg-white',
                      'w-[20px] h-[20px] m-0',
                    )}
                  />
                );
              }
              return (
                <button
                  key={j.toString()}
                  disabled
                  className={cn(
                    currentTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-400',
                    'w-[20px] h-[20px] m-0',
                  )}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
