'use client';

import { cls } from '@/utils/cls';
import { useState } from 'react';

type Props = {
  type: 'lg' | 'md' | 'sm';
  isChecked: boolean;
  handleCheck: () => void;
};

const styleMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export default function CommonCheckBox({ type, isChecked, handleCheck }: Props) {
  const [isPress, setIsPress] = useState(false);
  const style = styleMap[type];

  const handleMouseDown = () => {
    setIsPress(true);
  };

  const handleMouseUp = () => {
    setIsPress(false);
  };

  const handleBlur = () => {
    setIsPress(false);
  };

  const isCheckedAndPress = isPress && isChecked;

  // error, disabled 경우 잠시 보류
  return (
    <div
      aria-label="checkbox"
      tabIndex={0}
      onClick={handleCheck}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
      className={cls(
        isPress && !isCheckedAndPress ? 'bg-secondary-N40' : '',
        isChecked
          ? 'bg-primary-G400 border-primary-G400 hover:bg-primary-G300 hover:border-primary-G300'
          : 'hover:bg-secondary-N10 border-secondary-N40',
        isCheckedAndPress ? 'bg-primary-G500 border-primary-G500' : '',
        `flex justify-center items-center border-[1px] rounded-sm ${style} cursor-pointer`
      )}
    >
      {isChecked && (
        <svg
          data-testid="checkIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M1.2876 5.62495L4.87473 9.21208L10.7119 3.37495L9.96948 2.63257L4.87473 7.72695L2.02997 4.88257L1.2876 5.62495Z"
            fill="white"
          />
        </svg>
      )}
    </div>
  );
}
