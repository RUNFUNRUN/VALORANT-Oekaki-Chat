import { formatDate, unflattenArray } from '@/utils';
import type { Art } from '@prisma/client';
import { CopyButton } from './copy-button';
import { PreviewCanvas } from './preview-canvas';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Skeleton } from './ui/skeleton';

const ArtCard = ({ art }: { art: Art }) => {
  const asciiData = unflattenArray(art.body);
  const date = formatDate(new Date(art.createdAt));

  return (
    <Card className='w-[586px] px-8 mx-auto'>
      <CardHeader className='mx-0 px-0'>
        <CardTitle className='mx-0 px-0'>{art.title}</CardTitle>
        <CardDescription className='m-0 p-0 flex flex-col gap-2'>
          <span>{art.description}</span>
          <span className='text-right'>{date}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='mx-0 px-0'>
        <PreviewCanvas asciiData={asciiData} height={art.height} />
      </CardContent>
      <CardFooter className='flex justify-between mx-0 px-0'>
        <CopyButton asciiData={asciiData} height={art.height} />
        {/* favorite button */}
      </CardFooter>
    </Card>
  );
};

export const ArtCards = ({ arts }: { arts: Art[] }) => {
  if (arts.length === 0) {
    return (
      <p className='text-center font-bold text-2xl'>
        No content. Share your art with us!
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {arts.map((art) => (
        <ArtCard art={art} key={art.id} />
      ))}
    </div>
  );
};

export const SkeletonCards = () => {
  return (
    <div className='flex flex-col gap-4'>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Skeleton
            className='w-[586px] h-[358px] mx-auto'
            key={i.toString()}
          />
        ))}
    </div>
  );
};
