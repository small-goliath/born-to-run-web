'use client';

import BottomModal from './BottomModal';

import TabCategory from '../feed/TabCategory';
import LocationSelector from '../feed/running/LocationSelector';
import SolidButton from '../common/commonButton/SolidButton';
import OutlineButton from '../common/commonButton/OutlineButton';
import CommonSelector from '../common/CommonSelector';

import { HeaderTab, MARATHON_BOTTOM_MODAL_TABS, MARATHON_COURSE_LIST } from '@/data';
import { SelectItem } from '@/types/common';

interface Props {
  isActive: boolean;
  selectTab: HeaderTab;
  locations?: SelectItem[];
  courses?: SelectItem[];
  onClose: () => void;
  onSelectTab: (item: HeaderTab) => void;
  handleSelectLocations: (item: SelectItem | null) => void;
  handleSelectCourses: (item: SelectItem | null) => void;
  handleApplyFilters: () => void;
}

export default function MarathonFilterModal({
  isActive,
  selectTab,
  courses,
  locations,
  onClose,
  onSelectTab,
  handleSelectLocations,
  handleSelectCourses,
  handleApplyFilters,
}: Props) {
  const isApplyButtonDisabled = !courses || !locations || !courses.length || !locations.length;

  return (
    <BottomModal isActive={isActive} onClose={onClose} title="필터" closeType="back" height={500}>
      <TabCategory tab={selectTab} onSelectTab={onSelectTab} tabList={[...MARATHON_BOTTOM_MODAL_TABS]} />

      <div className="mt-6">
        {selectTab.type === 'location' && (
          <LocationSelector handleSelectLocations={handleSelectLocations} selectedLocations={locations} />
        )}
        {selectTab.type === 'course' && (
          <CommonSelector
            list={MARATHON_COURSE_LIST}
            handleSelectItem={handleSelectCourses}
            selectIconType="checkbox"
            checkSize="lg"
            selectedItems={courses}
            isMultiSelect
          />
        )}
      </div>

      <div className="flex items-center mt-4 gap-2 absolute w-full left-0 px-4 bottom-4">
        <OutlineButton text="취소" height="h-[3.5rem]" type="base" onClick={onClose} />
        <SolidButton
          title="적용"
          type="button"
          height="h-[3.5rem]"
          onClick={handleApplyFilters}
          disabled={isApplyButtonDisabled}
        />
      </div>
    </BottomModal>
  );
}
