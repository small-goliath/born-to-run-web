'use client';

import { useModal } from '@/hooks/useModal';
import { useRef } from 'react';
import { useCloseOnOutSideClick } from '@/hooks/useCloseOnOutsideClick';

import RePortIcon from '../../icon/commonIcon/reportIcon.svg';
import EditIcon from '../../icon/commonIcon/pencil.svg';
import TrashIcon from '../../icon/commonIcon/trashIcon.svg';
import CopyIcon from '../../icon/commonIcon/CopyIcon';

import CommonPopUp, { PopUpList } from '@/components/common/CommonPopUp';
import CircleSettingIcon from '@/components/icon/commonIcon/circleSettingIcon.svg';
import SettingIcon from '@/components/icon/commonIcon/settingIcon.svg';

type Props = {
  moreIconType?: 'circle' | 'base';
  isMyMoreView?: boolean;
  handlePopUpItem: (key?: string) => void;
};

export default function CommunityMoreSetting({ isMyMoreView, moreIconType, handlePopUpItem }: Props) {
  const moreViewModal = useModal();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useCloseOnOutSideClick(moreViewModal.hide, [buttonRef]);

  return (
    <div>
      <div>
        <button ref={buttonRef} className="block p-2" onClick={moreViewModal.toggling}>
          {moreIconType === 'circle' ? <CircleSettingIcon /> : <SettingIcon />}
        </button>
      </div>

      <div className="absolute right-0">
        <CommonPopUp
          list={isMyMoreView ? myMoreViewList : moreViewList}
          isMoreViewPopUp={moreViewModal.isVisible}
          onClick={handlePopUpItem}
        />
      </div>
    </div>
  );
}

const myMoreViewList: PopUpList[] = [
  {
    title: '복사',
    icon: <CopyIcon />,
    key: 'copy',
  },
  {
    title: '수정',
    icon: <EditIcon />,
    key: 'edit',
  },
  {
    title: '삭제',
    icon: <TrashIcon />,
    key: 'delete',
    em: true,
  },
];

export const moreViewList: PopUpList[] = [
  {
    title: '복사',
    icon: <CopyIcon />,
    key: 'copy',
  },
  {
    title: '신고',
    icon: <RePortIcon />,
    key: 'report',
    em: true,
  },
];
