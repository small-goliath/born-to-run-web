'use client';

import { RefObject, useCallback, useEffect } from 'react';

type Props = () => void;

export const useCloseOnOutSideClick = (close?: Props, refsArray: RefObject<HTMLElement>[] = []) => {
  const handleBackgroundClick = useCallback(
    (event: MouseEvent): void => {
      const isInsideRefs = refsArray?.some((ref) => ref.current?.contains(event.target as Node));
      if (isInsideRefs) {
        return;
      }
      if (!isInsideRefs) {
        close && close();
      }
    },
    [refsArray, close]
  );

  useEffect(() => {
    window.addEventListener('click', handleBackgroundClick);
    return () => {
      window.removeEventListener('click', handleBackgroundClick);
    };
  }, [handleBackgroundClick]);
};
