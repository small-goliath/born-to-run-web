'use client';

import { cls } from '@/utils/cls';
import { useState } from 'react';

type Props = {
  type: 'lg' | 'md' | 'sm';
  checked?: boolean;
  handleCheck?: () => void;
};

const styleMap = {
  sm: 'w-4 h-4', // width height 1rem
  md: 'w-5 h-5', // width height 1.25rem
  lg: 'w-6 h-6', // width height 1.5rem
};

// error disabled 논의 필요
export default function CommonRadioButton({ type, checked, handleCheck }: Props) {
  const style = styleMap[type];
  const [isPress, setIsPress] = useState(false);

  const handleMouseDown = () => {
    setIsPress(true);
  };

  const handleMouseUp = () => {
    setIsPress(false);
  };

  const handleBlur = () => {
    setIsPress(false);
  };

  const isCheckedAndPress = isPress && checked;

  return (
    <div
      aria-label="radiobutton"
      onClick={handleCheck}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
      tabIndex={0}
      className={cls(
        isPress && !isCheckedAndPress ? 'bg-secondary-N30 border-secondary-N90' : '',
        checked
          ? 'bg-primary-G400 hover:bg-primary-G300'
          : 'border-[1px] border-secondary-N40 hover:border-secondary-N60',
        isCheckedAndPress ? 'bg-primary-G500 hover:bg-primary-G500' : '',
        `rounded-lg ${style} transition-all flex justify-center items-center`
      )}
    >
      {checked && (
        <svg
          data-testid="radioIcon"
          xmlns="http://www.w3.org/2000/svg"
          width={type === 'sm' ? '6' : '8'}
          height={type === 'sm' ? '6' : '8'}
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle cx="3" cy="3" r="3" fill="white" />
        </svg>
      )}
    </div>
  );
}
