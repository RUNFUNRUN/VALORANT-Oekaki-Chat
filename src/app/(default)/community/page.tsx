import { prisma } from '@/client';
import { ArtCards, SkeletonCards } from '@/components/art-cards';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const ArtsList = async () => {
  const arts = await prisma.art.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return <ArtCards arts={arts} />;
};

const Page = () => {
  return (
    <div className='container mb-20'>
      <div className='flex flex-col gap-4 my-4'>
        <Suspense
          fallback={Array(3)
            .fill(null)
            .map((i) => <SkeletonCards key={i} />)}
        >
          <ArtsList />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'VALORANT Oekaki Chat | Community',
};
