'use client';

import { cls } from '@/utils/cls';

type Props = {
  type: 'enable' | 'close' | 'back' | 'em';
  hasBorder?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  text: string;
};

export default function TextButton({ onClick, text, type, hasBorder }: Props) {
  const enable = type === 'enable';
  const em = type === 'em';
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        hasBorder ? 'border-[1px] border-secondary-N40 rounded-md' : 'border-0',
        'h-14 min-w-[3.5rem] flex w-full items-center px-4'
      )}
    >
      <span
        className={cls(
          em ? 'text-system-r-R400' : "text-secondary-N900',",
          enable ? 'text-primary-G400' : 'text-secondary-N900',
          'text-label-lg font-bold tracking-label-md w-full'
        )}
      >
        {text}
      </span>
    </button>
  );
}
