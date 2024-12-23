'use client';

import type { AsciiData } from '@/types';
import { createAscii } from '@/utils';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export const CopyButton = ({
  asciiData,
  height,
}: { asciiData: AsciiData; height: number }) => {
  const { toast } = useToast();
  const handleCopy = () => {
    const asciiString = createAscii(asciiData, height);
    navigator.clipboard.writeText(asciiString);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  return <Button onClick={handleCopy}>Copy</Button>;
};
