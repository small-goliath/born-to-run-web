'use client';

import { cls } from '@/utils/cls';

import LogoBTRIcon from '../icon/logo/logoBTRIcon.svg';
import MainHeaderButton from './MainHeaderButton';

type Props = {
  title: string;
  isScrolled?: boolean;
  isScrolledLogo?: boolean;
};

export default function MainHeader({ isScrolled, isScrolledLogo, title }: Props) {
  return (
    <header
      className={cls(
        isScrolled ? 'shadow-elevation10' : '',
        'px-4 h-14 flex justify-between items-center fixed bg-white top-2 min-w-sm md:min-w-md z-20 '
      )}
    >
      {!isScrolledLogo && <h1 className="text-title-xl font-bold leading-title-xl">{title}</h1>}

      {isScrolledLogo &&
        (isScrolled ? <h1 className="text-title-xl font-bold leading-title-xl">{title}</h1> : <LogoBTRIcon />)}

      <MainHeaderButton />
    </header>
  );
}
