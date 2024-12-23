import type { AppType } from '@/app/api/hono/[[...route]]/route';
import { ArtCards, SkeletonCards } from '@/components/art-cards';
import type { Art } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { type InferResponseType, hc } from 'hono/client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const client = hc<AppType>('/');

export const InfiniteScrollArt = () => {
  const { ref, inView } = useInView();

  const fetchArts = async ({
    pageParam,
  }: { pageParam: number }): Promise<
    InferResponseType<typeof client.api.hono.arts.$get, 200>
  > => {
    const res = await client.api.hono.arts.$get({
      query: { cursor: pageParam.toString() },
    });

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
      {data.pages.map((page, i) => {
        const arts: Art[] =
          page.data !== undefined
            ? page.data.map((art) => {
                return {
                  id: art.id,
                  createdAt: new Date(art.createdAt),
                  title: art.title,
                  description: art.description,
                  body: art.body,
                  height: art.height,
                  userId: art.userId,
                };
              })
            : [];
        return <ArtCards arts={arts} key={i.toString()} />;
      })}
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
              : null}
        </button>
      </div>
      <div className='text-center mt-8'>
        {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
      </div>
    </>
  );
};
