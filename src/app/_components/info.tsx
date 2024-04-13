import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info as InfoIcon } from 'lucide-react';

export const Info = () => {
  return (
    <Alert className='text-xl w-[390px] md:w-[750px] lg:w-[1000px] mx-auto my-4'>
      <InfoIcon className='w-5 h-5' />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription className='text-lg'>
        I get a lot of requests for community forms, so I'm going to make one.
        However, since I have found a job, it will take some time.
      </AlertDescription>
    </Alert>
  );
};
