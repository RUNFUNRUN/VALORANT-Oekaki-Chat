'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import type { OpinionBoxData, OpinionBoxResponse } from '@/types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export const OpinionBox = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const { toast } = useToast();
  const able = (text === '' ?? false) || loading;

  const handleClick = async () => {
    setLoading(true);
    const reqJson: OpinionBoxData = { content: text };
    const post = await fetch('/api/opinion-box', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqJson),
    });
    const resJson: OpinionBoxResponse = await post.json();
    setOpen(false);
    setLoading(false);
    setText('');
    if (post.status !== 200) {
      toast({
        title: 'Failed to submit!',
        description: resJson.error,
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Submitted successfully!',
    });
  };

  return (
    <div className='text-center'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button type='button' className='text-xl font-bold underline my-4'>
            Click here to let me know what you think!
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Opinion box</DialogTitle>
            <DialogDescription className='text-lg'>
              <p>Let me know what you think!</p>
              <p>
                If you want a reply, write to me with your contact information
                or contact me on social media at Portforio in the footer.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Textarea
            className='resize-none'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <DialogFooter>
            <Button onClick={handleClick} disabled={able} className='sm:w-24'>
              {loading ? (
                <Loader2 className='h-8 w-8 animate-spin' />
              ) : (
                'Submit'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
