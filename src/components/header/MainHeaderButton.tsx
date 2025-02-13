'use Client';

import { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';

import AttendanceIcon from '../icon/commonIcon/attendanceIcon.svg';
import SearchIcon from '../icon/commonIcon/SearchIcon.svg';
import Modal from '../modal/Modal';
import FeedSearchModal from '../feed/search/FeedSearchModal';

export default function MainHeaderButton() {
  const searchModal = useModal();

  useEffect(() => {
    if (searchModal.isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [searchModal.isVisible]);

  return (
    <div className="flex items-center space-x-[1.5rem]">
      <AttendanceIcon />
      <button onClick={searchModal.show}>
        <SearchIcon />
      </button>

      <Modal isActive={searchModal.isVisible} notHasBackLayer>
        <FeedSearchModal onCloseSearchModal={searchModal.hide} isActiveSearch={searchModal.isVisible} />
      </Modal>
    </div>
  );
}
