import { useToastStore } from '@/store/toastStore';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { queryClient } from '@/QueryProvider';
import { queryKeys } from '@/constants';
import {
  CommunityDetail,
  CommunityForm,
  CommunityUpdateArgs,
  communityDelete,
  communityDetail,
  communityPost,
  communityUpdate,
} from '@/service/community';
import { UseMutationCustomOption, UseQueryCustomOption } from '@/types/common';

function useGetCommunityDetailFeed(id: number, queryOptions?: UseQueryCustomOption<CommunityDetail>) {
  return useSuspenseQuery({
    queryKey: [queryKeys.COMMUNITY.DETAIL, id],
    queryFn: () => communityDetail(id),
    staleTime: 1000 * 60 * 57,
    gcTime: 1000 * 60 * 57,
    ...queryOptions,
  });
}

function useCreateCommunityFeed(mutationOptions?: UseMutationCustomOption) {
  const { addToast } = useToastStore();
  const router = useRouter();
  return useMutation({
    mutationKey: [queryKeys.COMMUNITY.POST],
    mutationFn: (data: CommunityForm) => communityPost(data),
    onSuccess: () => {
      router.replace('/?create=success');
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] !== queryKeys.USER.INFO;
        },
      });
      addToast({ type: 'base', message: '글을 게시했어요' });
    },
    ...mutationOptions,
  });
}

function useEditCommunityFeed(id: number, mutationOptions?: UseMutationCustomOption) {
  const { addToast } = useToastStore();
  const router = useRouter();
  return useMutation({
    mutationKey: [queryKeys.COMMUNITY.UPDATE],
    mutationFn: (data: CommunityUpdateArgs) => communityUpdate(data),
    onSuccess: () => {
      router.push(`/community/detail/${id}`);
      queryClient.invalidateQueries();
      addToast({
        message: '게시물을 수정했어요.',
        type: 'base',
      });
    },
    ...mutationOptions,
  });
}

function useDeleteCommunity(communityId: number, mutationOptions?: UseMutationCustomOption) {
  const router = useRouter();
  const { addToast } = useToastStore();

  return useMutation({
    mutationKey: [queryKeys.COMMUNITY.DELETE],
    mutationFn: () => communityDelete(communityId),
    onSuccess: () => {
      router.replace('/?delete=success');
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] !== queryKeys.USER.INFO &&
            query.queryKey[0] !== queryKeys.COMMUNITY.DETAIL &&
            query.queryKey[0] !== queryKeys.COMMENT.ALL
          );
        },
      });
      addToast({ type: 'base', message: '게시물을 삭제했어요.' });
    },
    ...mutationOptions,
  });
}

export { useGetCommunityDetailFeed, useCreateCommunityFeed, useEditCommunityFeed, useDeleteCommunity };
