'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { cls } from '@/utils/cls';
import ChevronIcon from '../icon/commonIcon/chevron.svg';
import CloseIcon from '../icon/commonIcon/CloseIcon';

type Props = {
  title?: string;
  closeIconType?: 'back' | 'close';
  children?: React.ReactNode;
  isShadow?: boolean;
  backUrl?: string;
  color?: string;
  onBackHandler?: () => void;
};

export default function PageHeader({
  title,
  children,
  isShadow,
  closeIconType = 'back',
  backUrl,
  color,
  onBackHandler,
}: Props) {
  const router = useRouter();

  const handleBackPage = useCallback(() => {
    if (onBackHandler) return onBackHandler();
    backUrl ? router.push(backUrl) : router.back();
  }, [backUrl, onBackHandler, router]);

  return (
    <header
      className={cls(
        isShadow ? 'shadow-elevation10' : '',
        'h-14 flex justify-between items-center fixed bg-white z-20 top-0 left-0 right-0 w-sm md:w-md m-auto px-2'
      )}
    >
      <div className="flex justify-center items-center p-2">
        <button type="button" onClick={handleBackPage}>
          {closeIconType === 'back' ? <ChevronIcon /> : <CloseIcon color={color || '#000000'} />}
        </button>
      </div>

      <h1 className="text-title-lg font-bold leading-title-lg">{title}</h1>

      <div>{children}</div>
    </header>
  );
}
