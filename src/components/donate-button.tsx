import Link from 'next/link';

export const DonateButton = () => {
  return (
    <Link
      href='https://www.buymeacoffee.com/runfunrun'
      className='m-0 fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded-xl'
      target='_blank'
    >
      Buy me a coffee!
    </Link>
  );
};
