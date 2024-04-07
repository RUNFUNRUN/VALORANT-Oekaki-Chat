import Link from 'next/link';

export const DonateButton = () => {
  return (
    <Link
      href='https://www.buymeacoffee.com/runfunrun'
      className='mx-auto mt-auto mb-6 sm:m-0 sm:fixed sm:bottom-4 sm:right-4 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-xl'
      target='_blank'
    >
      Buy me a coffee!
    </Link>
  );
};
