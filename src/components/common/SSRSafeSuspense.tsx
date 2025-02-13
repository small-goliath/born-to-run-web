'use client';

import { useMounted } from '@/hooks/useMounted';
import { Suspense } from 'react';

type Props = React.ComponentProps<typeof Suspense>;

function SSRSafeSuspense(props: Props) {
  const { fallback } = props;
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  return <>{fallback}</>;
}

export default SSRSafeSuspense;
