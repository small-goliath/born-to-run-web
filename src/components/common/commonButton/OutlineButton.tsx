'use client';

import { cls } from '@/utils/cls';
import LoadingSpinner from '../LoadingSpinner';

type Props = {
  scale?: 'sm' | 'lg';
  type: 'base' | 'active';
  height: 'h-[3.5rem]' | 'h-[2.5rem]';
  text: string;
  isLoading?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

export default function OutlineButton({ height, type, isLoading, text, scale = 'lg', ...attribute }: Props) {
  const { disabled } = attribute;
  const isGreen = type === 'active';
  return (
    <button
      {...attribute}
      className={cls(
        disabled
          ? 'border-secondary-N40'
          : isGreen
          ? 'border-primary-G400 hover:border-primary-G300 focus:border-primary-G500'
          : 'border-secondary-N40 hover:border-secondary-N60 focus:border-secondary-N90',
        `h-14 min-w-[3.5rem] flex w-full items-center justify-center px-4 border-[1px] rounded-md hover:bg-secondary-N10  focus:bg-secondary-N30 ${height}`
      )}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <span
          className={cls(
            disabled
              ? 'text-secondary-N40'
              : isGreen
              ? 'text-primary-G400 focus:text-primary-G500 hover:text-primary-G300'
              : 'text-black hover:text-secondary-N800',
            scale === 'lg' ? 'text-label-lg tracking-label-md ' : ' text-label-sm tracking-label-sm',
            'font-bold'
          )}
        >
          {text}
        </span>
      )}
    </button>
  );
}
