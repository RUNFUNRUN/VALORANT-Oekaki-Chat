import type { Metadata } from 'next';
import { InfiniteScrollArt } from './_components/infinite-scroll-art';

const Page = () => {
  return (
    <div className='container mt-4 mb-20'>
      <InfiniteScrollArt resolution='fullhd' />
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'VALORANT Oekaki Chat | Community',
};
