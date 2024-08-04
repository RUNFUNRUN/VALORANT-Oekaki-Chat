import { cn } from '@/lib/utils';
import { formatDate, unflattenArray } from '@/utils';
import { Art } from '@prisma/client';
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
  const asciiData = unflattenArray(art.body, art.width);
  const date = formatDate(art.createdAt);

  return (
    <Card
      className={cn(
        art.width === 27 ? 'w-[606px]' : 'w-[586px]',
        'px-8 mx-auto',
      )}
    >
      <CardHeader className='mx-0 px-0'>
        <CardTitle className='mx-0 px-0'>{art.title}</CardTitle>
        <CardDescription className='m-0 p-0 flex justify-between'>
          <span>{art.description}</span>
          <span>{date}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='mx-0 px-0'>
        <PreviewCanvas
          asciiData={asciiData}
          width={art.width}
          height={art.height}
        />
      </CardContent>
      <CardFooter className='flex justify-between mx-0 px-0'>
        <CopyButton
          asciiData={asciiData}
          width={art.width}
          height={art.height}
        />
        {/* favorite button */}
      </CardFooter>
    </Card>
  );
};

export const ArtCards = ({ arts }: { arts: Art[] }) => {
  return (
    <div className='flex flex-col gap-4'>
      {arts.map((art) => (
        <ArtCard art={art} key={art.id} />
      ))}
    </div>
  );
};

export const SkeletonCards = () => {
  return <Skeleton className='w-[586px] h-[330px] mx-auto' />;
};
