'use client';

import { UIContextProvider } from '@/contexts/ui';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <UIContextProvider>{children}</UIContextProvider>;
};

export default Providers;
