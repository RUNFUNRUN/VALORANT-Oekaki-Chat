const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return <div>{params.slug}</div>;
};

export default Page;
