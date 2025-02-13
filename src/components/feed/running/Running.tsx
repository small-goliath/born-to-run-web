'use client';

import { useSelectItem } from '@/hooks/useSelect';

import MainHeader from '@/components/header/MainHeader';

import ListCategory from '../ListCategory';
import Navbar from '@/components/navigation/Navbar';
import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import MarathonList from './marathon/MarathonList';

import { HeaderTab, RUNNING_HEADER_TABS } from '@/data';
import RunningSkeleton from './RunningSkeleton';

export default function Running() {
  const { selectItem: selectListTab, handleSelectItem: handleSelectListTab } = useSelectItem<HeaderTab>({
    title: '마라톤',
    type: 'marathon',
  });

  return (
    <section>
      <MainHeader title="러닝" />
      <div className="mb-4">
        <ListCategory
          headerTab={selectListTab}
          handleHeaderTab={handleSelectListTab}
          headerTabList={[...RUNNING_HEADER_TABS]}
          categoryType="running"
        />
      </div>

      {selectListTab.type === 'marathon' && (
        <SSRSafeSuspense fallback={<RunningSkeleton />}>
          <MarathonList handleSelectListTab={handleSelectListTab} />
        </SSRSafeSuspense>
      )}

      <Navbar />
    </section>
  );
}
