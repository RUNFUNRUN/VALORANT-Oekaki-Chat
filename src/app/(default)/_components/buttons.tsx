import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import type { AsciiData, Height } from '@/types';
import { createAscii } from '@/utils';
import type { Dispatch, SetStateAction } from 'react';
import { ShareButton } from './share-button';

export const Buttons = ({
  asciiData,
  setAsciiData,
  height,
}: {
  asciiData: AsciiData;
  setAsciiData: Dispatch<SetStateAction<AsciiData>>;
  height: Height;
}) => {
  const handleDownload = () => {
    const asciiString = createAscii(asciiData, height);
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
    <div className='my-8'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <CopyButton asciiData={asciiData} height={height} />
          <Button onClick={handleDownload}>Download</Button>
          <ShareButton asciiData={asciiData} height={height} />
        </div>
        <Button variant='outline' onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
