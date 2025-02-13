'use client';

import useUser from '@/hooks/useUser';
import { useCommunityDetailLike } from '@/hooks/queries/community/useCommunityLike';
import { useModal } from '@/hooks/useModal';

import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';
import ActionBiggerLikeIcon from '../../../icon/commonIcon/actionBiggerLikeIcon.svg';
import BiggerLikeIcon from '../../../icon/commonIcon/biggerLikeIcon.svg';

type Props = {
  isMyRecommendation?: boolean;
  feedId?: number;
};

export default function DetailLike({ isMyRecommendation, feedId }: Props) {
  const { isLoggedIn } = useUser();
  const modal = useModal();
  const { isFeedDeleLikeError, feedDeleteLikeError, isFeedLikeError, handleFeedLike, feedDetailLikeError } =
    useCommunityDetailLike(feedId);

  const isLoginError =
    feedDeleteLikeError?.statusCode === 401 || feedDetailLikeError?.statusCode === 401 || !isLoggedIn;
  const isExtraError = !isLoggedIn && (isFeedDeleLikeError || isFeedLikeError);

  const onClick = () => {
    if (isLoginError) {
      modal.show();
    }
    handleFeedLike();
  };

  return (
    <div>
      <button className="p-2" onClick={onClick}>
        {isMyRecommendation ? <ActionBiggerLikeIcon /> : <BiggerLikeIcon />}
      </button>

      {isLoginError && <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />}
      {isExtraError && <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />}
    </div>
  );
}
