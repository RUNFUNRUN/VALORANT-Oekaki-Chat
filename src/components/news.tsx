const message =
  'The preview of the community feature has begun! The new features are still simplified.';

export const News = () => {
  return (
    <div className='bg-gradient-to-r from-red-400 via-red-600 to-red-300 w-full flex justify-center items-center'>
      <p className='text-gray-200 text-lg font-bold'>{message}</p>
    </div>
  );
};
