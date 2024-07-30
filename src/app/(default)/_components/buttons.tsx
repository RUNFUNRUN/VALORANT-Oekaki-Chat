import { PreviewCanvas } from '@/components/preview-canvas';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import type { AsciiData, Height, ShareArtResponse } from '@/types';
import { createAscii } from '@/utils';
import { Loader2 } from 'lucide-react';
import { getSession, useSession } from 'next-auth/react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { shareArtSchema } from '@/schemas';

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
  const router = useRouter();
  const { status } = useSession();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const shareForm = useForm<z.infer<typeof shareArtSchema>>({
    resolver: zodResolver(shareArtSchema),
    defaultValues: {
      title: '',
      description: '',
      ascii: asciiData,
      width: width,
      height: height,
    },
  });

  const isEmpty = (arr = asciiData): boolean => {
    if (arr.length === 0) return true;
    const firstValue = arr[0][0];
    return arr
      .slice(0, height)
      .every((row) =>
        row.slice(0, width).every((value) => value === firstValue),
      );
  };

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

  const onSubmit = async (values: z.infer<typeof shareArtSchema>) => {
    setShareLoading(true);
    try {
      const result = await fetch('/api/share', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const data = (await result.json()) as ShareArtResponse;
      setShareLoading(false);
      setOpen(false);
      router.push(`/posts/${data.slug}`);
      toast({
        title: 'Submitted successfully!',
      });
    } catch {
      setShareLoading(false);
      setOpen(false);
      toast({
        title: 'An error occurred!',
      });
    }
  };

  return (
    <div className='w-[390px] md:w-[750px] lg:w-[1000px] mx-auto my-8'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          <Button onClick={handleCopy}>Copy</Button>
          <Button onClick={handleDownload}>Download</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type='button' disabled={isEmpty()}>
                Share to community
              </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[600px] px-8'>
              {status === 'authenticated' ? (
                <Form {...shareForm}>
                  <DialogHeader>
                    <DialogTitle>Share to community</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={shareForm.handleSubmit(onSubmit)}
                    className='space-y-6'
                  >
                    <div className='flex flex-col gap-2'>
                      <FormField
                        control={shareForm.control}
                        name='title'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={shareForm.control}
                        name='description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>description</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <PreviewCanvas
                      asciiData={asciiData}
                      width={width}
                      height={height}
                    />
                    <Button
                      type='submit'
                      disabled={shareLoading}
                      className='w-40'
                    >
                      {shareLoading ? (
                        <Loader2 className='mr-2 w-6 h-6 animate-spin' />
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className='text-center py-8'>
                  <p className='text-4xl font-bold'>First, please sign in!</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <Button variant='outline' onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
