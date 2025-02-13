import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import useUser from '../../useUser';

import { CommunityAll, CommunityContent, communityDeleteLike, communityLike } from '@/service/community';
import { queryKeys } from '@/constants';
import { ServerError } from '@/types/common';

type FeedData = {
  pages: CommunityAll[];
};

export const useCommunityListLike = (queryKey: (string | boolean | undefined | null)[]) => {
  const { isLoggedIn } = useUser();
  const [isMutating, setIsMutating] = useState(false);

  const filterUndefinedQueryKey = queryKey.filter((key) => key !== undefined);

  const queryClient = useQueryClient();
  const {
    mutate: feedLikeMutate,
    isError: isFeedLikeError,
    error: feedLikeError,
  } = useMutation<void, ServerError, number>({
    mutationKey: [queryKeys.COMMUNITY.LIKE],
    mutationFn: (feedId: number) => communityLike(feedId),
    onSuccess: () => {
      setIsMutating(false);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: filterUndefinedQueryKey });
    },
  });
  const {
    mutate: communityDeleteLikeMutate,
    isError: isFeedDeleLikeError,
    error: communityDeleteLikeError,
  } = useMutation<void, ServerError, number>({
    mutationKey: [queryKeys.COMMUNITY.LIKE],
    mutationFn: (feedId: number) => communityDeleteLike(feedId),
    onSuccess: () => {
      setIsMutating(false);
    },
    onError: () => {
      setIsMutating(false);
      queryClient.invalidateQueries({ queryKey: filterUndefinedQueryKey });
    },
  });

  const handleFeedLike = useCallback(
    (feedId: number, pageIndex: number) => {
      if (isMutating || !isLoggedIn) return;
      setIsMutating(true);
      queryClient.setQueryData(filterUndefinedQueryKey, (oldPages: FeedData) => {
        const newPages = oldPages ? [...oldPages.pages] : [];
        const targetFeed = newPages[pageIndex]?.content.find((feed) => feed.feedId === feedId);
        if (targetFeed) {
          if (targetFeed.viewer.hasMyRecommendation) {
            targetFeed.recommendationQty -= 1;
            communityDeleteLikeMutate(feedId);
          } else {
            targetFeed.recommendationQty += 1;
            feedLikeMutate(feedId);
          }
          targetFeed.viewer.hasMyRecommendation = !targetFeed.viewer.hasMyRecommendation;
        }
        return { ...oldPages, pages: newPages };
      });
    },
    [communityDeleteLikeMutate, feedLikeMutate, filterUndefinedQueryKey, isLoggedIn, isMutating, queryClient]
  );

  return {
    handleFeedLike,
    isFeedLikeError: isFeedLikeError || isFeedDeleLikeError,
    feedLikeError: feedLikeError || communityDeleteLikeError,
  };
};

export const useCommunityDetailLike = (feedId?: number) => {
  const { isLoggedIn } = useUser();
  const [isMutating, setIsMutating] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutate: feedLikeMutate,
    isError: isFeedLikeError,
    error: feedDetailLikeError,
  } = useMutation<void, ServerError, number>({
    mutationKey: [queryKeys.COMMUNITY.LIKE],
    mutationFn: (feedId: number) => communityLike(feedId),
    onSuccess: () => {
      setIsMutating(false);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMUNITY.DETAIL, feedId],
      });
    },
    onError: () => {
      setIsMutating(false);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMUNITY.DETAIL, feedId],
      });
    },
  });

  const {
    mutate: communityDeleteLikeMutate,
    isError: isFeedDeleLikeError,
    error: feedDeleteLikeError,
  } = useMutation<void, ServerError, number>({
    mutationKey: [queryKeys.COMMUNITY.LIKE],
    mutationFn: (feedId: number) => communityDeleteLike(feedId),
    onSuccess: () => {
      setIsMutating(false);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMUNITY.DETAIL, feedId],
      });
    },
    onError: () => {
      setIsMutating(false);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMUNITY.DETAIL, feedId],
      });
    },
  });

  const feedInfo = queryClient.getQueryData<CommunityContent>([queryKeys.COMMUNITY.DETAIL, feedId]);

  const handleFeedLike = useCallback(() => {
    if (!feedId || !feedInfo || !isLoggedIn) return;
    if (isMutating) return;
    setIsMutating(true);

    queryClient.setQueryData([queryKeys.COMMUNITY.DETAIL, feedId], (prevData: CommunityContent) => {
      if (prevData) {
        return {
          ...prevData,
          recommendationQty: prevData.viewer.hasMyRecommendation
            ? prevData.recommendationQty - 1
            : prevData.recommendationQty + 1,
          viewer: {
            ...prevData.viewer,
            hasMyRecommendation: !prevData.viewer.hasMyRecommendation,
          },
        };
      }
      return prevData;
    });

    if (feedInfo?.viewer.hasMyRecommendation) {
      communityDeleteLikeMutate(feedId);
    } else {
      feedLikeMutate(feedId);
    }
    feedInfo.viewer.hasMyRecommendation = !feedInfo.viewer.hasMyRecommendation;
  }, [communityDeleteLikeMutate, feedId, feedInfo, feedLikeMutate, isLoggedIn, isMutating, queryClient]);

  return {
    isFeedLikeError,
    isFeedDeleLikeError,
    handleFeedLike,
    feedDetailLikeError,
    feedDeleteLikeError,
  };
};
