'use client'

import { SessionProvider } from 'next-auth/react';
import ClientProvider from './ClientProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ClientProvider>{children}</ClientProvider>
    </SessionProvider>
  );
};

export default Providers;
