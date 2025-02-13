'use client';

import { useMarathonListBookmark, useMarathonListDeleteBookmark } from '@/hooks/queries/running/useMarathonBookmark';
import { useModal } from '@/hooks/useModal';
import { usePathname } from 'next/navigation';
import useUser from '@/hooks/useUser';

import Bookmark from '../Bookmark';
import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';

interface Props {
  isBookmarking: boolean;
  feedId: number;
}

export default function MarathonListBookmark({ isBookmarking, feedId }: Props) {
  const { isLoggedIn, isUserError } = useUser();
  const modal = useModal();
  const pathName = usePathname();
  const {
    mutate: listBookmarking,
    isPending: isListBookmarkingLoading,
    error: listBookmarkingError,
  } = useMarathonListBookmark(modal.show);
  const {
    mutate: listDeleteBookmarking,
    isPending: isListDeleteBookmarkingLoading,
    error: listDeleteBookmarkingError,
  } = useMarathonListDeleteBookmark(modal.show);

  const loginError = listBookmarkingError?.statusCode === 401 || listDeleteBookmarkingError?.statusCode === 401;
  const extraError = !loginError && (listBookmarkingError || listDeleteBookmarkingError);

  const toggleBookmark = () => {
    if (!isLoggedIn || isUserError) return modal.show();
    if (isListBookmarkingLoading || isListDeleteBookmarkingLoading) return;
    if (!isBookmarking) {
      listBookmarking(feedId);
      return;
    } else {
      listDeleteBookmarking(feedId);
    }
  };

  return (
    <>
      <Bookmark isBookmark={isBookmarking} toggleBookmarking={toggleBookmark} />
      <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} backUrl={pathName} />

      {extraError && <ErrorModal closeModal={modal.hide} isActive={modal.isVisible} />}
    </>
  );
}
