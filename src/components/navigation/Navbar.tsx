'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { NAVBAR_LIST } from '@/data';

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav
      style={{ boxShadow: '0px -4px 12px -1px rgba(17, 17, 17, 0.05)' }}
      className="h-[3.625rem] border-t-[#EFEFEF] border-t-[1px] py-2 fixed w-[22.5rem] bottom-0 z-10 bg-white md:w-[48rem]"
    >
      <ul className="flex items-center w-full justify-between">
        {NAVBAR_LIST.map((nav) => (
          <Link href={nav.path} key={nav.key} className="w-full flex justify-center items-center">
            <li className="flex flex-col items-center">
              <div className="mb-1">{pathName === nav.path ? <nav.activeIcon /> : <nav.icon />}</div>
              <span className="text-body-xs leading-body-xs">{nav.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
