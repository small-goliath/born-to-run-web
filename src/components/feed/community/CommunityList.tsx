'use client';

import { useCommunityListLike } from '@/hooks/queries/community/useCommunityLike';
import { useGetInfiniteCommunity } from '@/hooks/queries/community/useInfiniteCommunity';
import { useModal } from '@/hooks/useModal';
import { useRetryHandler } from '@/hooks/useRetryHandler';
import { useInfiniteScroll } from '@/hooks/useScrollPosition';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { queryKeys } from '@/constants';
import { HeaderTab } from '@/data';
import { CommunityAllArgs, CrewPublic } from '@/service/community';
import { ACCESS_TOKEN } from '@/service/httpClient';
import { User } from '@/service/user';
import { getCookie } from 'cookies-next';
import CommonDivider from '../../common/CommonDivider';
import ErrorModal from '../../modal/ErrorModal';
import CrewPublicSelector from '../CrewPublicSelector';
import NotContent from '../NotContent';
import CommunityItem from './CommunityItem';

type Props = {
  headerTab: HeaderTab;
  myInfo?: User;
  searchKeyword?: string | null;
  isLoggedIn?: boolean;
  isUserError?: boolean;
};

export default function CommunityList({ headerTab, isLoggedIn, isUserError }: Props) {
  const searchKeyword = useSearchParams().get('keyword');
  const modal = useModal();
  const [accessLevel, setAccessLevel] = useState<CrewPublic>('ALL');
  const isCrewPublic = accessLevel === 'IN_CREW';
  const { isScrolled, markerRef, observe } = useInfiniteScroll();

  const { handleFeedLike, feedLikeError } = useCommunityListLike([
    queryKeys.COMMUNITY.ALL,
    headerTab.type,
    isCrewPublic,
    searchKeyword || null,
  ]);

  const queryParams: CommunityAllArgs = {
    category: headerTab.type,
    myCrew: isCrewPublic,
    token: getCookie(ACCESS_TOKEN) || undefined,
    searchKeyword,
  };

  const {
    data: feeds,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isError: isFeedError,
    error: feedError,
    refetch,
  } = useGetInfiniteCommunity({
    queryParams,
    isScrolled,
    query: {
      headerTab: headerTab.type,
      isCrewPublic,
      searchKeyword,
    },
  });

  const notFeeds = feeds?.pages.length === 0;

  const handleCheckCrewPublic = useCallback(() => {
    setAccessLevel((prev) => (prev === 'ALL' ? 'IN_CREW' : 'ALL'));
  }, []);

  useEffect(() => {
    if (isScrolled && hasNextPage) {
      fetchNextPage();
    }
  }, [isScrolled, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isSuccess) {
      observe();
    }
  }, [isSuccess, observe]);

  useEffect(() => {
    if (isFeedError) {
      modal.show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFeedError]);

  const { handleRetry, isRetry } = useRetryHandler({
    handler: () => refetch(),
  });

  return (
    <section>
      <div className="mt-4">
        <CrewPublicSelector
          handleCheck={handleCheckCrewPublic}
          isCrewPublic={isCrewPublic}
          isLoggedIn={isLoggedIn}
          isUserError={isUserError}
        />
      </div>
      {notFeeds ? (
        <NotContent />
      ) : (
        <div>
          <ul>
            {feeds?.pages.map((page, pageIndex) =>
              page.content.map((feed, feedIndex) => (
                <React.Fragment key={feed.id}>
                  <CommunityItem
                    feed={feed}
                    handleFeedLike={() => handleFeedLike(feed.id, pageIndex)}
                    feedLikeError={feedLikeError}
                    isLoggedIn={isLoggedIn}
                    isUserError={isUserError}
                  />
                  {feedIndex < page.content.length - 1 && (
                    <div className="py-2">
                      <CommonDivider type="sm" />
                    </div>
                  )}
                </React.Fragment>
              ))
            )}
          </ul>

          <div ref={markerRef} />
        </div>
      )}

      {feedError && feedError?.statusCode !== 401 && isRetry && (
        <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} handleRetry={handleRetry} />
      )}
    </section>
  );
}
