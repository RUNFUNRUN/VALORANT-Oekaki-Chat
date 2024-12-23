import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;

export const metadata: Metadata = {
  title: 'VALORANT Oekaki Chat | Community',
};
