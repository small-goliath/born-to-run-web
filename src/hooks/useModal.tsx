import { useState } from 'react';

export function useModal() {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    setIsVisible(true);
  };
  const hide = () => {
    setIsVisible(false);
  };

  const toggling = () => {
    setIsVisible((prev) => !prev);
  };

  return {
    isVisible,
    show,
    hide,
    toggling,
  };
}
