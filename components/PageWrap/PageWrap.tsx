'use client';

import { ReactNode } from 'react';
import cn from '@/utils/cn';
import { useUIContext } from '@/contexts/ui';

type PageWrapProps = {
  children: ReactNode;
  className?: string;
};

const PageWrap = ({ children, className }: PageWrapProps) => {
  const { headerHeight } = useUIContext();

  return (
    <div
      className={cn({
        [className as string]: !!className,
      })}
      style={{
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default PageWrap;
