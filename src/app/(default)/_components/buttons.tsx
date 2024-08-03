import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import type { AsciiData, Height } from '@/types';
import { createAscii } from '@/utils';
import type { Dispatch, SetStateAction } from 'react';
import { ShareButton } from './share-button';

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
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <Button onClick={handleCopy}>Copy</Button>
          <Button onClick={handleDownload}>Download</Button>
          <ShareButton asciiData={asciiData} width={width} height={height} />
        </div>
        <Button variant='outline' onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
