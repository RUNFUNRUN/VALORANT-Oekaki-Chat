'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';

export const SignIn = ({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) => {
  const handleSignIn = async () => {
    await signIn(provider, {
      callbackUrl: '/',
    });
  };
  return (
    <Button {...props} onClick={handleSignIn}>
      Sign In
    </Button>
  );
};

export const SignOut = (props: React.ComponentPropsWithRef<typeof Button>) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  return (
    <Button
      variant='ghost'
      className='w-full p-0'
      {...props}
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};
