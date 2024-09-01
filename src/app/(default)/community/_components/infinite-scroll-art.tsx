'use client';

import { ArtCards, SkeletonCards } from '@/components/art-cards';
import type { ArtsResponse, Resolution } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const InfiniteScrollArt = ({
  resolution,
}: { resolution: Resolution }) => {
  const { ref, inView } = useInView();

  const fetchArts = async ({
    pageParam,
  }: { pageParam: number }): Promise<ArtsResponse> => {
    const seartchParams = new URLSearchParams();
    seartchParams.set('cursor', pageParam.toString());
    seartchParams.set('width', resolution === 'fullhd' ? '26' : '27');

    const res = await fetch(`/api/arts/?${seartchParams}`);
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['arts'],
    queryFn: fetchArts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return status === 'pending' ? (
    <SkeletonCards />
  ) : status === 'error' ? (
    <p className='text-center'>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page, i) => (
        <ArtCards arts={page.data ?? []} key={i.toString()} />
      ))}
      <div className='text-center mt-8'>
        <button
          type='button'
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
        </button>
      </div>
      <div className='text-center mt-8'>
        {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
      </div>
    </>
  );
};
