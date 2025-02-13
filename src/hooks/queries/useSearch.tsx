import { useMutation, useQuery } from '@tanstack/react-query';

import { UseMutationCustomOption, UseQueryCustomOption } from '@/types/common';
import { queryClient } from '@/QueryProvider';
import { queryKeys } from '@/constants';
import {
  SearchKeywordAll,
  searchKeywordAll,
  searchKeywordDelete,
  searchKeywordDeleteAll,
  searchKeywordPost,
} from '@/service/search';

function useGetSearchList(queryOptions?: UseQueryCustomOption<SearchKeywordAll>) {
  return useQuery({
    queryKey: [queryKeys.COMMUNITY.SEARCH.ALL],
    queryFn: () => searchKeywordAll(),
    ...queryOptions,
  });
}

function useDeleteSearchKeyword(mutationOptions?: UseMutationCustomOption) {
  return useMutation({
    mutationKey: [queryKeys.COMMUNITY.SEARCH.DELETE],
    mutationFn: (keyword: string) => searchKeywordDelete(keyword),
    onSuccess: (data, keyword) => {
      queryClient.setQueryData([queryKeys.COMMUNITY.SEARCH.ALL], (oldData: SearchKeywordAll) => {
        return {
          ...oldData,
          searchKeywords: oldData.searchKeywords.filter((data) => data !== keyword),
        };
      });
    },
    ...mutationOptions,
  });
}

function useDeleteSearchKeywordAll(mutationOptions?: UseMutationCustomOption<void, void>) {
  return useMutation({
    mutationKey: [queryKeys.COMMUNITY.SEARCH.ALL_DELETE],
    mutationFn: () => searchKeywordDeleteAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMUNITY.SEARCH.ALL],
      });
    },

    ...mutationOptions,
  });
}

function useCreateSearchKeyword(mutationOptions?: UseMutationCustomOption) {
  return useMutation({
    mutationKey: [queryKeys.COMMUNITY.SEARCH.POST],
    mutationFn: (keyword: string) => searchKeywordPost(keyword),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMUNITY.SEARCH.ALL],
      });
    },
    ...mutationOptions,
  });
}

export { useGetSearchList, useDeleteSearchKeyword, useDeleteSearchKeywordAll, useCreateSearchKeyword };
