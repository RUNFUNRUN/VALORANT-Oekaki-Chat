import { ClientProvider } from '@/components/providers/client-provider';
import { InfiniteScrollArt } from './_components/infinite-scroll-art';

const Page = () => {
  return (
    <ClientProvider>
      <div className='container mt-4 mb-20'>
        <InfiniteScrollArt />
      </div>
    </ClientProvider>
  );
};

export default Page;
