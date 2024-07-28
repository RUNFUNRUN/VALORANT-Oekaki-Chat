import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { cn } from '@/lib/utils';

export const runtime = 'edge';

const inter = Inter({ subsets: ['latin'] });

const NotFound = () => {
  return (
    <main
      className={cn(
        inter.className,
        'flex flex-col justify-center items-center min-h-dvh gap-4',
      )}
    >
      <p className='text-xl font-bold'>
        <Link href='/'>valorant-oekaki-chat.net</Link>
      </p>
      <p className='text-3xl font-bold'>404 Not found</p>
      <p>
        <Link href='/' className='underline font-bold text-xl'>
          Back to home
        </Link>
      </p>
    </main>
  );
};

export default NotFound;
