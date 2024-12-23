import type { AppType } from '@/app/api/hono/[[...route]]/route';
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
import { WIDTH } from '@/config';
import { artApiSchema } from '@/schemas';
import type { AsciiData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { hc } from 'hono/client';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

const client = hc<AppType>('/');

export const ShareButton = ({
  asciiData,
  height,
}: {
  asciiData: AsciiData;
  height: number;
}) => {
  const router = useRouter();
  const { status } = useSession();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const shareForm = useForm<z.infer<typeof artApiSchema>>({
    resolver: zodResolver(artApiSchema),
    defaultValues: {
      title: '',
      description: '',
      ascii: asciiData,
      height: height,
    },
  });

  const isEmpty = (arr = asciiData): boolean => {
    if (arr.length === 0) return true;
    const firstValue = arr[0][0];
    return arr
      .slice(0, height)
      .every((row) =>
        row.slice(0, WIDTH).every((value) => value === firstValue),
      );
  };

  const onSubmit = async (values: z.infer<typeof artApiSchema>) => {
    values.ascii = asciiData;
    values.height = height;

    setShareLoading(true);
    try {
      const res = await client.api.hono.arts.$post({ json: values });
      if (res.status !== 201) {
        throw new Error();
      }
      const art = (await res.json()).art;
      // router.push(`/community/${art.id}`);
      toast({
        title: 'Submitted successfully!',
      });
    } catch {
      toast({
        title: 'An error occurred!',
      });
    } finally {
      setShareLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type='button' disabled={isEmpty()}>
          Share to community
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[586px] px-8'>
        {status === 'authenticated' ? (
          <Form {...shareForm}>
            <DialogHeader>
              <DialogTitle>Share to community</DialogTitle>
              {/* suppress warning */}
              <DialogDescription />
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
              <PreviewCanvas asciiData={asciiData} height={height} />
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
