'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';

import ImageSlider from '../ImageSlider';
import Writer from '../Writer';
import Contents from './Contents';
import ActionGroup from './ActionGroup';
import NotContent from '../NotContent';

import { CommunityContent } from '@/service/community';
import { ServerError } from '@/types/common';

import ErrorModal from '@/components/modal/ErrorModal';

type Props = {
  feed: CommunityContent;
  feedLikeError?: ServerError | null;
  handleFeedLike?: (feedId: number) => void;
  isLoggedIn?: boolean;
  isUserError?: boolean;
};

export default function CommunityItem({ feed, handleFeedLike, feedLikeError, isLoggedIn, isUserError }: Props) {
  const modal = useModal();
  const router = useRouter();

  const onProfilePage = useCallback(() => {
    if (!isLoggedIn || isUserError) return modal.show();
    modal.hide();
    router.push('/my');
  }, [isLoggedIn, isUserError, modal, router]);

  const onDetailFeedPage = useCallback(
    (id: number) => {
      router.push(`/community/detail/${id}`);
    },
    [router]
  );

  const handleFeedLikeButton = useCallback(() => {
    if (!isLoggedIn || isUserError) return modal.show();

    if (handleFeedLike && feed.feedId) {
      handleFeedLike(feed.feedId);
    }
    modal.hide();
  }, [feed.feedId, handleFeedLike, isLoggedIn, isUserError, modal]);

  useEffect(() => {
    if ((feedLikeError && feedLikeError.statusCode === 401) || isUserError) {
      modal.show();
    }
  }, [feedLikeError, isUserError, modal]);

  return (
    <li className="list-none">
      {!feed ? (
        <NotContent />
      ) : (
        <article className="py-4">
          <div className="mb-4 px-4">
            <Writer onProfilePage={onProfilePage} registeredAt={feed.registeredAt} writerInfo={feed.writer} />
          </div>

          {feed?.imageUris && feed.imageUris.length > 0 && (
            <div className="mb-4">
              <ImageSlider imageUris={feed.imageUris} />
            </div>
          )}
          <div className="px-4 mb-4">
            <Contents contents={feed.contents} isMoreViewBtnNeed />
          </div>

          <div className="px-4">
            <ActionGroup
              commentQty={feed?.commentQty}
              recommendationQty={feed?.recommendationQty}
              viewQty={feed?.viewQty}
              hasComment={feed?.viewer?.hasMyComment}
              hasMyRecommendation={feed?.viewer?.hasMyRecommendation}
              handleFeedLikeButton={handleFeedLikeButton}
              onDetailFeedPage={() => onDetailFeedPage(feed?.feedId)}
            />
          </div>
        </article>
      )}

      {/* <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} /> */}
      {feedLikeError && feedLikeError?.statusCode !== 401 && (
        <ErrorModal isActive={modal.isVisible} isHome backHomeText="돌아가기" closeModal={modal.hide} />
      )}
    </li>
  );
}
