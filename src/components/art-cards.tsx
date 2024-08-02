import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Skeleton } from './ui/skeleton';

const ArtCard = () => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className='flex justify-between'></CardFooter>
    </Card>
  );
};

export const ArtCards = () => {
  return <div>artcards</div>;
};

export const SkeletonCards = () => {
  return <Skeleton />;
};
