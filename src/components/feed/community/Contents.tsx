'use client';

import { cls } from '@/utils/cls';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  contents: string;
  isMoreViewBtnNeed?: boolean;
  limitLineHight?: number;
};

export default function Contents({ contents, isMoreViewBtnNeed = false, limitLineHight = 2 }: Props) {
  const [isMoreViewBtn, setIsMoreViewBtn] = useState(false);
  const [calHeight, setCalHeight] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
    setLineHeight(lineHeight * limitLineHight);
    const height = textRef.current.scrollHeight;
    setIsMoreViewBtn(height > lineHeight * limitLineHight);
    setCalHeight(height);
  }, [limitLineHight]);

  const handleMoreView = useCallback(() => {
    setIsMoreViewBtn(!isMoreViewBtn);
  }, [isMoreViewBtn]);

  return (
    <div>
      <p
        style={{ height: isMoreViewBtnNeed && isMoreViewBtn ? lineHeight : calHeight }}
        ref={textRef}
        className={cls(
          limitLineHight ? `line-clamp-${limitLineHight}` : '',
          'text-body-md font-regular leading-body-md tracking-body-md overflow-hidden text-secondary-N900'
        )}
      >
        {contents}
      </p>

      {isMoreViewBtnNeed && isMoreViewBtn && (
        <div style={{ width: '48px', height: '24px' }} className="flex items-center">
          <button
            onClick={handleMoreView}
            className="text-label-md font-bold tracking-label-md text-primary-G400 w-12 h-6 text-left"
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
}
