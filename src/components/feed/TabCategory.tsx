import { motion } from 'framer-motion';

import { HeaderTab } from '@/data';

interface Props {
  tabList: HeaderTab[];
  tab: HeaderTab;
  onSelectTab: (item: HeaderTab) => void;
}

export default function TabCategory({ tabList, onSelectTab, tab }: Props) {
  return (
    <ul className="flex items-center border-b border-b-secondary-N30 px-4">
      {tabList.map((item) => (
        <li
          onClick={() => onSelectTab(item)}
          key={item.type}
          className="cursor-pointer flex-1 flex justify-center items-center"
        >
          <span className="flex justify-center items-center h-10 relative">
            {item.title}

            {tab.type === item.type && (
              <motion.div layoutId="tabCategory" className="absolute w-full h-1 bg-secondary-N900 bottom-0" />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
