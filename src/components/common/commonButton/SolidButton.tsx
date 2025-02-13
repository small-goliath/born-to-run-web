'use client';

import LoadingSpinner from '../LoadingSpinner';

import { cls } from '@/utils/cls';

type Props = React.HTMLProps<HTMLButtonElement> & {
  onClick?: () => void;
  title: string;
  type?: 'button' | 'submit' | 'reset';
  height: 'h-[3.5rem]' | 'h-[2.5rem]';
  isLoading?: boolean;
  isDanger?: boolean;
};

export default function SolidButton({ onClick, title, type, height, isLoading, isDanger, ...attribute }: Props) {
  const { disabled } = attribute;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cls(
        disabled
          ? 'bg-secondary-N40'
          : isDanger
          ? 'bg-system-r-R400 hover:bg-system-r-R300 focus:bg-system-r-R500'
          : 'bg-primary-G400 hover:bg-primary-G300 focus:bg-primary-G500',
        `min-w-[3.5rem] w-full rounded-md px-4 flex justify-center items-center transition-all ${height}`
      )}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <span className="text-label-lg tracking-label-lg font-bold transition-all text-white">{title}</span>
      )}
    </button>
  );
}
