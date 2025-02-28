import { queryKeys } from '@/constants';
import { CommunityAll, CommunityAllArgs, communityAll } from '@/service/community';
import { ServerError } from '@/types/common';
import {
    InfiniteData,
    QueryKey,
    UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query';

type CommunityUpdateKey = {
  isCrewPublic: boolean;
  searchKeyword: string | null;
  headerTab: string;
};

type CommunityQueryParams = {
  query: CommunityUpdateKey;
  queryParams: CommunityAllArgs;
  isScrolled: boolean;
};

function useGetInfiniteCommunity(
  args: CommunityQueryParams,
  queryOptions?: UseInfiniteQueryOptions<
    CommunityAll,
    ServerError,
    InfiniteData<CommunityAll, unknown> | undefined,
    CommunityAll,
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryKey: [queryKeys.COMMUNITY.ALL, args.query?.headerTab, args.query?.isCrewPublic, args.query?.searchKeyword],
    queryFn: ({ pageParam = 0 }) => {
      args.queryParams.lastFeedId = args.isScrolled ? (pageParam as number) : 0;
      return communityAll(args.queryParams);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const lastBoardIndex = lastPage.content.length - 1;
      if (lastPage.content.length > 0 && !lastPage.last) {
        return lastPage.content[lastBoardIndex].id;
      }
      return;
    },
    staleTime: 1000 * 60 * 57,
    gcTime: 1000 * 60 * 57,
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

export { useGetInfiniteCommunity };
