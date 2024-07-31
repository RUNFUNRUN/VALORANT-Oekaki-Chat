'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export const SignIn = ({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) => {
  return (
    <Button
      {...props}
      onClick={async () => {
        await signIn();
      }}
    >
      Sign In
    </Button>
  );
};

export const SignOut = (props: React.ComponentPropsWithRef<typeof Button>) => {
  return (
    <Button
      variant='ghost'
      className='w-full p-0'
      {...props}
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </Button>
  );
};
