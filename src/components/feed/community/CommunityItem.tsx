'use client';

import { useModal } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import ImageSlider from '../ImageSlider';
import NotContent from '../NotContent';
import Writer from '../Writer';
import ActionGroup from './ActionGroup';
import Contents from './Contents';

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

    if (handleFeedLike && feed.id) {
      handleFeedLike(feed.id);
    }
    modal.hide();
  }, [feed.id, handleFeedLike, isLoggedIn, isUserError, modal]);

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
              onDetailFeedPage={() => onDetailFeedPage(feed?.id)}
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
