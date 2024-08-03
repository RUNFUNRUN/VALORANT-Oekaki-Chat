import { PreviewCanvas } from '@/components/preview-canvas';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { shareArtSchema } from '@/schemas';
import type { AsciiData, ShareArtResponse } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export const ShareButton = ({
  asciiData,
  width,
  height,
}: {
  asciiData: AsciiData;
  width: number;
  height: number;
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
      router.push(`/community/${data.slug}`);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type='button' disabled={isEmpty()}>
          Share to community
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(width === 27 ? 'min-w-[606px]' : 'min-w-[586px]', 'px-8')}
      >
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
              <Button type='submit' disabled={shareLoading} className='w-40'>
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
  );
};
