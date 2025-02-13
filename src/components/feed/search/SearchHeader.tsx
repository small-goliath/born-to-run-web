'use client';

import { motion } from 'framer-motion';

import { cls } from '@/utils/cls';
import { HeaderTab } from '@/data';

type Props = {
  headerTabList: HeaderTab[];
  handleHeaderTab: (headerTitle: HeaderTab) => void;
  headerTab: Pick<HeaderTab, 'title'>;
};

export default function SearchHeader({ handleHeaderTab, headerTab, headerTabList }: Props) {
  return (
    <div>
      <ul className="flex items-center">
        {headerTabList.map((tab) => (
          <li
            key={tab.type}
            onClick={() => handleHeaderTab(tab)}
            className="min-w-[6.83rem] h-10 flex justify-center items-center flex-grow cursor-pointer relative"
          >
            <span
              className={cls(
                tab.title === headerTab.title ? 'text-black' : 'text-secondary-N60',
                'text-label-sm font-bold tracking-label-sm'
              )}
            >
              {tab.title}
              {headerTab.title === tab.title && (
                <motion.div
                  layoutId="searchHeader"
                  className="h-[0.125rem] w-full bg-black absolute bottom-0 left-0 right-0"
                />
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
