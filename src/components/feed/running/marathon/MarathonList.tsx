'use client';

import { useScrollProgress, useScrollToTop } from '@/hooks/useScrollPosition';
import { useModal } from '@/hooks/useModal';
import { useSelectItem } from '@/hooks/useSelect';
import { useCallback, useEffect, useState } from 'react';
import { useGetMarathonList } from '@/hooks/queries/running/useMarathon';
import { useRetryHandler } from '@/hooks/useRetryHandler';
import { useMarathonFilterChipStore } from '@/store/useMarathonFilterChipsStore';

import MarathonFilterModal from '@/components/modal/MarathonFilterModal';

import ErrorModal from '@/components/modal/ErrorModal';
import LoginModal from '@/components/signup/LoginModal';
import ListFilterChipTabs from '../../ListFilterChipTabs';
import ListGroupTitle from '../ListGroupTitle';
import RunningFeedItem from '../RunningFeedItem';
import ListCompletedNotification from '../ListCompletedNotification';
import Toast from '@/components/common/Toast';

import { HeaderTab, MARATHON_CHIP_TABS } from '@/data';
import { cls } from '@/utils/cls';
import ChevronDownIcon from '@/components/icon/commonIcon/ChevronDownIcon';
import { groupDataByMonth } from '@/utils/dataFormat';
import { SelectItem } from '@/types/common';

interface Props {
  handleSelectListTab: (item: HeaderTab) => void;
}

export default function MarathonList({ handleSelectListTab }: Props) {
  const filterBottomModal = useModal();
  const { isScrolledPx } = useScrollProgress(0, 65);
  const modal = useModal();
  const scrollToTop = useScrollToTop();
  const { selectItem: filterChipTab, handleSelectItem: handleFilterChipTab } = useSelectItem<HeaderTab>({
    title: '지역',
    type: 'location',
  });
  const { courses, locations, setCourses, setLocations, clear: clearFilterChips } = useMarathonFilterChipStore();

  const [applyFilters, setApplyFilters] = useState<{ locations?: string[]; courses?: string[] }>({
    locations: locations.map((location) => String(location.title)),
    courses: courses?.map((course) => String(course.title)),
  });

  const {
    data: marathonList,
    isPending: isLoading,
    isSuccess,
    error: marathonListError,
    isError,
    refetch,
  } = useGetMarathonList(
    {
      locations: applyFilters.locations,
      courses: applyFilters.courses,
    },
    {}
  );

  const groupMarathons = groupDataByMonth(marathonList?.marathons);
  const marathonChipList = MARATHON_CHIP_TABS.map((item) => {
    let count = 0;
    let isActive = false;
    if (!isLoading) {
      if (item.type === 'location') {
        count = applyFilters.locations?.length || 0;
        isActive = count > 0;
      } else if (item.type === 'course') {
        count = applyFilters.courses?.length || 0;
        isActive = count > 0;
      }
    }

    return {
      ...item,
      icon: <ChevronDownIcon size={16} />,
      title: isLoading || !isSuccess || count === 0 ? item.title : `${item.title} ${count}`,
      isActive: isLoading ? false : isActive,
    };
  });

  const onSelectFilterChipTab = useCallback(
    (item: HeaderTab) => {
      handleFilterChipTab(item);
      filterBottomModal.show();
    },
    [filterBottomModal, handleFilterChipTab]
  );

  const handleApplyFilters = useCallback(() => {
    setApplyFilters({
      locations: locations?.map((location) => String(location.title)),
      courses: courses?.map((course) => String(course.title)),
    });
    filterBottomModal.hide();
    scrollToTop();
  }, [courses, filterBottomModal, locations, scrollToTop]);

  const onRefresh = useCallback(() => {
    setApplyFilters({
      courses: [],
      locations: [],
    });
    clearFilterChips();
    scrollToTop();
  }, [clearFilterChips, scrollToTop]);

  const handleListCompleteSelectTab = useCallback(() => {
    handleSelectListTab({
      title: '모임',
      type: 'class',
    });
    scrollToTop();
  }, [handleSelectListTab, scrollToTop]);

  const { handleRetry, isRetry } = useRetryHandler({
    handler: () => refetch(),
  });

  const isAppliesFilters = () => {
    return (courses && courses.length > 0) || (locations && locations.length > 0);
  };
  const isChipFilteredFixed = isScrolledPx && isAppliesFilters();

  useEffect(() => {
    if (isError) {
      modal.show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <>
      <div className={cls(isChipFilteredFixed ? 'fixed top-14 bg-white w-sm md:w-md z-30' : '', 'h-10')}>
        <ListFilterChipTabs list={marathonChipList} onSelectTab={onSelectFilterChipTab} onRefresh={onRefresh} />
      </div>
      {isChipFilteredFixed && <div className="mt-4 h-10" />}

      <ul className="flex flex-col gap-4 px-4 mt-4 pb-1.5">
        {groupMarathons &&
          Object.keys(groupMarathons).map((month) => (
            <li key={month} className="flex flex-col gap-4">
              <ListGroupTitle title={`${month}월`} />
              {groupMarathons[Number(month)].map((item) => (
                <RunningFeedItem key={item.marathonId} item={item} />
              ))}
            </li>
          ))}

        {marathonList && (
          <ListCompletedNotification
            listTypeTitle="마라톤"
            description="새로운 러닝 모임을 둘러보는건 어떠세요?"
            onSelectListType={handleListCompleteSelectTab}
          />
        )}
      </ul>

      <MarathonFilterModal
        locations={locations}
        courses={courses}
        selectTab={filterChipTab}
        isActive={filterBottomModal.isVisible}
        handleSelectLocations={setLocations}
        handleSelectCourses={setCourses}
        handleApplyFilters={handleApplyFilters}
        onClose={filterBottomModal.hide}
        onSelectTab={handleFilterChipTab}
      />

      {marathonListError && marathonListError.statusCode === 401 && (
        <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} backUrl="/running" />
      )}
      {marathonListError && marathonListError.statusCode !== 401 && isRetry && (
        <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} handleRetry={handleRetry} />
      )}

      <Toast isShowing isClearOnPathChange bottom="4.125rem" />
    </>
  );
}
