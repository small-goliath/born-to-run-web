import { CSSProperties } from 'react';

import RefreshIcon from '../icon/commonIcon/refreshIcon.svg';
import ChipsTab from './ChipsTab';
import { HeaderTab } from '@/data';

type Chip = {
  title: string;
  type: string;
  isActive?: boolean;
  isChecked?: boolean;
  icon?: React.ReactNode;
};

interface Props {
  list: Chip[];
  styles?: CSSProperties;
  onSelectTab: (item: HeaderTab) => void;
  onRefresh?: () => void;
  onClose?: (item: HeaderTab) => void;
}

export default function ListFilterChipTabs({ list, onSelectTab, onRefresh, styles, onClose }: Props) {
  return (
    <ul style={styles} className="flex items-center gap-2">
      {list.some((item) => item.isActive) && <ChipsTab title="초기화" icon={<RefreshIcon />} onClick={onRefresh} />}
      {list.map((item) => (
        <li key={item.type}>
          <ChipsTab
            onClick={() => onSelectTab(item)}
            title={item.title}
            icon={item.icon}
            isActive={item.isActive}
            onClose={() => onClose && onClose(item)}
          />
        </li>
      ))}
    </ul>
  );
}
