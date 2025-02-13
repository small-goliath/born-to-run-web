'use client';

import { useModal } from '@/hooks/useModal';
import {
  useMarathonDeleteDetailBookmark,
  useMarathonDetailBookmark,
} from '@/hooks/queries/running/useMarathonBookmark';
import { useCallback } from 'react';

import PageHeader from '@/components/header/PageHeader';
import Share from '../../Share';
import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';
import MarathonMoreSetting from './MarathonMoreSetting';
import Bookmark from '../Bookmark';

import FeedShareIcon from '@/components/icon/commonIcon/FeedShareIcon';

interface Props {
  marathonId: number;
  isBookmark?: boolean;
}

export default function MarathonDetailHeader({ marathonId, isBookmark }: Props) {
  const modal = useModal();
  const shareModal = useModal();

  const onError = () => {
    modal.show();
  };
  const {
    error: bookmarkingError,
    mutate: bookmarking,
    isPending: isBookmarkingLoading,
  } = useMarathonDetailBookmark(marathonId, {
    onError,
  });
  const {
    mutate: deleteBookmarking,
    error: deleteBookmarkingError,
    isPending: isDeleteBookmarkingLoading,
  } = useMarathonDeleteDetailBookmark(marathonId, {
    onError,
  });

  const loginError = bookmarkingError?.statusCode === 401 || deleteBookmarkingError?.statusCode === 401;
  const extraError = !loginError && (bookmarkingError || deleteBookmarkingError);

  const toggleBookmarking = useCallback(() => {
    if (!marathonId || isBookmarkingLoading || isDeleteBookmarkingLoading) return;
    if (isBookmark) {
      deleteBookmarking(marathonId);
      return;
    } else {
      bookmarking(marathonId);
      return;
    }
  }, [bookmarking, deleteBookmarking, isBookmark, isBookmarkingLoading, isDeleteBookmarkingLoading, marathonId]);

  return (
    <PageHeader>
      <ul className="flex items-center gap-2">
        <li className="w-10 h-10 flex justify-center items-center">
          <FeedShareIcon onShare={shareModal.show} />
        </li>
        <li className="w-10 h-10 flex justify-center items-center">
          <Bookmark isBookmark={isBookmark} toggleBookmarking={toggleBookmarking} />
        </li>
        <li>
          <MarathonMoreSetting marathonId={marathonId} />
        </li>
      </ul>

      <Share
        shareImageUrl=""
        shareDescription="마라톤 상세보기"
        hideShareModal={shareModal.hide}
        isShareModal={shareModal.isVisible}
      />

      {loginError && <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />}
      {extraError && <ErrorModal closeModal={modal.hide} isActive={modal.isVisible} />}
    </PageHeader>
  );
}
