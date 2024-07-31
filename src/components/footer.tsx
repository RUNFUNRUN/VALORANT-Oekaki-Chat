import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='mb-2 mt-auto text-center text-xl lg:flex lg:justify-center lg:gap-10'>
      <p className='hidden lg:block text-muted-foreground'>
        &copy; 2022-2024 RUNFUNRUN
      </p>
      <div className='flex'>
        <Link
          href='https://twitter.com/GRAPH_fps'
          className='text-blue-500 hover:underline'
        >
          Twitter
        </Link>
        <Separator orientation='vertical' className='mx-2' />
        <Link
          href='https://github.com/RUNFUNRUN/VALORANT-Oekaki-Chat'
          className='text-blue-500 hover:underline'
        >
          GitHub
        </Link>
        <Separator orientation='vertical' className='mx-2' />
        <Link
          href='https://www.runfunrun.info'
          className='text-blue-500 hover:underline'
        >
          Portfolio
        </Link>
        <Separator orientation='vertical' className='mx-2' />
        <Link
          href='https://www.runfunrun.tech'
          className='text-blue-500 hover:underline'
        >
          Blog
        </Link>
      </div>
      <p className='lg:hidden mt-4'>&copy; 2022-2024 RUNFUNRUN</p>
    </footer>
  );
};
