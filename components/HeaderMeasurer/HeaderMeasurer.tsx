'use client';

import { useEffect } from 'react';
import { useUIContext } from '@/contexts/ui';

const HeaderHeightMeasurer = () => {
  const { setHeaderHeight } = useUIContext();

  useEffect(() => {
    // measure the height of the header
    const headerElement = document.getElementById('header');

    if (headerElement) {
      const height = headerElement.offsetHeight;
      setHeaderHeight(height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default HeaderHeightMeasurer;
