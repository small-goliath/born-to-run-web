import SolidButton from '../common/commonButton/SolidButton';
import CommonSelector from '../common/CommonSelector';
import BottomModal from './BottomModal';

import { Crew } from '@/service/auth';
import { SelectItem } from '@/types/common';

interface Props {
  crewList: Crew[];
  selectedCrewName?: SelectItem;
  isActive: boolean;
  handleSelectCrew: (crew: SelectItem) => void;
  handleSelectionComplete: () => void;
  onClose: () => void;
}
export default function CrewSelectorModal({
  crewList,
  selectedCrewName,
  isActive,
  handleSelectCrew,
  handleSelectionComplete,
  onClose,
}: Props) {
  const formatList = crewList.map((crew) => ({
    title: crew.crewName,
    key: Number(crew.id),
  }));
  
  return (
    <BottomModal isActive={isActive} onClose={onClose} title="크루선택" closeType="back">
      <div className="flex flex-col gap-4">
        <CommonSelector
          list={formatList}
          selectIconType="radio"
          checkSize="sm"
          handleSelectItem={handleSelectCrew}
          selectedItem={selectedCrewName}
        />

        <div>
          <SolidButton
            onClick={handleSelectionComplete}
            title="선택 완료"
            disabled={!Boolean(selectedCrewName)}
            height="h-[3.5rem]"
          />
        </div>
      </div>
    </BottomModal>
  );
}
