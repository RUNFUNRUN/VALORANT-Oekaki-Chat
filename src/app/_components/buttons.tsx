import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import type { AsciiData, Height } from '@/types';
import type { Dispatch, SetStateAction } from 'react';
import { createAscii } from '../_utils';

export const Buttons = ({
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
  const { toast } = useToast();

  const handleCopy = () => {
    const asciiString = createAscii(asciiData, width, height);
    navigator.clipboard.writeText(asciiString);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const handleDownload = () => {
    const asciiString = createAscii(asciiData, width, height);
    const element: HTMLAnchorElement = document.createElement('a');
    const file: Blob = new Blob([asciiString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'VALORANT-Oekaki-Chat_export.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setAsciiData(asciiData.map((row) => row.map(() => false)));
  };

  return (
    <div className='w-[390px] md:w-[750px] lg:w-[1000px] mx-auto my-8'>
      <div className='flex'>
        <Button className='ml-0' onClick={handleCopy}>
          Copy
        </Button>
        <Button className='ml-4 mr-auto' onClick={handleDownload}>
          Download
        </Button>
        <Button className='mr-0' variant={'outline'} onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
