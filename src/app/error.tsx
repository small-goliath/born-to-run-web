'use client';

import ErrorModal from '@/components/modal/ErrorModal';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('error.tsx ', error);
  }, [error]);

  return <ErrorModal isActive isHome backHomeText="확인" closeModal={() => false} />;
}
