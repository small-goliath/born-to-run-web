import { ButtonHTMLAttributes } from 'react';

import { cls } from '@/utils/cls';
import CheckIcon from '../icon/commonIcon/checkIcon.svg';
import PlusIcon from '../icon/commonIcon/PlusIcon.svg';
import CloseIcon from '../icon/commonIcon/CloseIcon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isChecked?: boolean;
  isActive?: boolean;
  isPlus?: boolean;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export default function ChipsTab({ title, isChecked, isActive, isPlus, icon, onClose, ...props }: Props) {
  return (
    <button
      {...props}
      className={cls(
        isActive ? 'border-0 bg-black' : 'border',
        isChecked ? 'border-primary-G400' : 'border-secondary-N40',
        'rounded-lg px-4 py-[0.469rem] flex items-center gap-1 min-w-[4.813rem]'
      )}
    >
      <span
        className={cls(
          isChecked || isActive ? 'font-bold' : '',
          isActive ? 'text-white' : '',
          'text-label-sm tracking-label-sm'
        )}
      >
        {title}
      </span>
      {icon}
      {isPlus && !isChecked && !isActive && (
        <span data-testid="plusIcon">
          <PlusIcon />
        </span>
      )}
      {isChecked && (
        <span data-testid="checkIcon">
          <CheckIcon />
        </span>
      )}
      {isActive && (
        <div data-testid="closeIcon" onClick={onClose}>
          <CloseIcon color="#B7B7B7" size="16" />
        </div>
      )}
    </button>
  );
}
