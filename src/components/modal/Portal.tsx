'use client';

import { useEffect, useState } from 'react';
import reactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function Portal({ children }: Props) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEl(document.getElementById('modal'));
  }, []);

  if (!el) return null;
  return reactDom.createPortal(children, el);
}
