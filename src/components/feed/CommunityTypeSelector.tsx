'use client';

import { useCallback, useState } from 'react';

import CommonSelector from '@/components/common/CommonSelector';
import BottomModal from '../modal/BottomModal';

import ArrowDownIcon from '../icon/commonIcon/arrowDownIcon.svg';
import { HOME_HEADER_TABS, HeaderTab } from '@/data';
import { SelectItem } from '@/types/common';

type Props = {
  feedCategory?: HeaderTab;
  setFeedCategory?: (headerTab?: HeaderTab) => void;
};

export default function CommunityTypeSelector({ feedCategory, setFeedCategory }: Props) {
  const [isTypeSelector, setIsTypeSelector] = useState(false);

  const closeSelector = useCallback(() => {
    setIsTypeSelector(false);
  }, []);

  const handleSelectItem = useCallback(
    (item: SelectItem) => {
      if (!setFeedCategory) return;
      const selectedTab: HeaderTab = {
        title: item.title === '커뮤니티' ? '커뮤니티' : '마켓',
        type: item.title === '커뮤니티' ? 'COMMUNITY' : 'MARKET',
      };
      setFeedCategory(selectedTab);
    },
    [setFeedCategory]
  );

  return (
    <>
      <button
        onClick={() => setIsTypeSelector(true)}
        type="button"
        className="h-12 min-w-[3.5rem] flex items-center justify-center space-x-2 px-4"
      >
        <span className="text-label-md font-bold tracking-label-lg">{feedCategory?.title}</span>
        <ArrowDownIcon />
      </button>

      <BottomModal isActive={isTypeSelector} onClose={closeSelector} title="게시판 선택" closeType="close">
        <CommonSelector
          list={HOME_HEADER_TABS.map((tab) => ({
            title: tab.title,
            key: tab.type,
          }))}
          handleSelectItem={handleSelectItem}
          selectedItem={{
            key: feedCategory?.type ?? '',
            title: feedCategory?.title ?? '',
          }}
          checkSize="lg"
          selectIconType="radio"
        />
      </BottomModal>
    </>
  );
}
