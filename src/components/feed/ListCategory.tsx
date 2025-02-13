import { HeaderTab } from '@/data';
import { cls } from '@/utils/cls';

import { motion } from 'framer-motion';

type Props = {
  headerTabList: HeaderTab[];
  handleHeaderTab: (headerTitle: HeaderTab) => void;
  headerTab: Pick<HeaderTab, 'title'>;
  borerActiveColor?: string;
  categoryType: 'community' | 'running';
};

export default function ListCategory({
  headerTabList,
  headerTab,
  borerActiveColor = '#50C85A',
  categoryType,
  handleHeaderTab,
}: Props) {
  return (
    <div className="bg-white z-10 h-12 left-0 right-0 px-2">
      <ul className="flex items-center h-full">
        {headerTabList.map((item) => (
          <li onClick={() => handleHeaderTab(item)} key={item.type} className="">
            <button className="px-2 h-12 relative">
              <span
                className={cls(
                  'text-title-xl font-bold block',
                  headerTab.title === item.title ? 'text-black' : 'text-secondary-N60'
                )}
              >
                {item.title}
                {headerTab.title === item.title && (
                  <motion.div
                    style={{ backgroundColor: borerActiveColor }}
                    layoutId={categoryType}
                    className="h-1 w-4 rounded-lg absolute bottom-0 left-0 right-0 m-auto"
                  />
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
