'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InfiniteScrollArt } from './_components/infinite-scroll-art';

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container mt-4 mb-20'>
        <InfiniteScrollArt />
      </div>
    </QueryClientProvider>
  );
};

export default Page;
