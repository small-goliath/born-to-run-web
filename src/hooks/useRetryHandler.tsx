import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Retry = {
  retryCount?: number;
  handler?: () => void;
};

function useRetryHandler({ retryCount = 2, handler }: Retry) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [isRetry, setIsRetry] = useState(true);

  const handleRetry = () => {
    if (count >= retryCount) {
      setIsRetry(false);
      router.replace('/');
      return;
    }
    setCount((prev) => prev + 1);
    handler && handler();
  };

  return {
    handleRetry,
    retryCount: count,
    isRetry,
  };
}

export { useRetryHandler };
