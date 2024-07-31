import { auth } from '@/auth';
import { SignIn, SignOut } from './auth-components';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export const UserButton = async () => {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative w-8 h-8 rounded-full'>
            {session.user.image ? (
              <Avatar className='w-8 h-8'>
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name ?? ''}
                />
              </Avatar>
            ) : (
              <Skeleton className='w-8 h-8 rounded-full' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {session.user.name}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
