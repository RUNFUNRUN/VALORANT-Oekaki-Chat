import { notFound } from 'next/navigation';

const Page = async (props: { params: Promise<{ artId: string }> }) => {
  // TODO: implemented later
  notFound();
  const params = await props.params;
  return <div>{params.artId}</div>;
};

export default Page;
