import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useToastStore } from '@/store/toastStore';
import { useRouter } from 'next/navigation';

import { queryClient } from '@/QueryProvider';
import {
  CommentAll,
  CommentDetailContent,
  CommentUpdate,
  commentAll,
  commentDelete,
  commentDetail,
  commentPost,
  commentUpdate,
} from '@/service/comment';
import { ServerError, UseMutationCustomOption, UseQueryCustomOption } from '@/types/common';
import { number, queryKeys } from '@/constants';

function useDeleteCommentInList(
  { commentId, feedId }: { commentId: number; feedId: number },
  mutationOptions?: UseMutationCustomOption
) {
  const router = useRouter();
  return useMutation<void, ServerError, number>({
    mutationKey: [queryKeys.COMMENT.DELETE, commentId],
    mutationFn: () => commentDelete(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMENT.ALL, feedId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMUNITY.DETAIL, feedId],
      });
      router.replace(`/community/detail/${feedId}`);
    },
    ...mutationOptions,
  });
}

function useDeleteComment(commentId: number, mutationOptions?: UseMutationCustomOption) {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  return useMutation<void, ServerError, any>({
    mutationKey: [queryKeys.COMMENT.DELETE],
    mutationFn: () => commentDelete(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] !== queryKeys.USER.INFO;
        },
      });
      addToast({
        message: '댓글을 삭제했어요.',
        type: 'base',
      });
    },
    ...mutationOptions,
  });
}

type CreateComment = {
  contents: string;
};

type CreateCommentArgs = {
  feedId: number;
  parentCommentId?: number;
};

function useCreateComment({ feedId, parentCommentId }: CreateCommentArgs, mutationOptions?: UseMutationCustomOption) {
  return useMutation<void, ServerError, CreateComment>({
    mutationKey: [queryKeys.COMMENT.POST],
    mutationFn: ({ contents }) => commentPost({ contents, feedId, commentId: parentCommentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] !== queryKeys.USER.INFO;
        },
      });
    },
    ...mutationOptions,
  });
}

function useGetCommentDetail(commentId: number, queryOptions?: UseQueryCustomOption<CommentDetailContent | undefined>) {
  return useSuspenseQuery({
    queryKey: [queryKeys.COMMENT.DETAIL, commentId],
    queryFn: () => commentDetail(commentId),
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    ...queryOptions,
  });
}

function useGetCommentList(feedId: number, queryOptions?: UseQueryCustomOption<CommentAll>) {
  return useSuspenseQuery({
    queryKey: [queryKeys.COMMENT.ALL, feedId],
    queryFn: () => commentAll(feedId),
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    ...queryOptions,
  });
}

function useGetCommentInfo(commentId: number, queryOptions?: UseQueryCustomOption<CommentDetailContent | undefined>) {
  return useSuspenseQuery({
    queryKey: [queryKeys.COMMENT.DETAIL, commentId],
    queryFn: () => commentDetail(commentId),
    staleTime: number.QUERY_ONE_HOUR_TIMES,
    gcTime: number.QUERY_ONE_HOUR_TIMES,
    ...queryOptions,
  });
}
type EditCommentQueryIds = {
  commentId: number;
  feedId: number;
};
function useEditComment(queryIds: EditCommentQueryIds, mutationOptions?: UseMutationCustomOption) {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { commentId, feedId } = queryIds;
  return useMutation({
    mutationKey: [queryKeys.COMMENT.UPDATE],
    mutationFn: (data: CommentUpdate) => commentUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMENT.DETAIL, commentId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.COMMENT.ALL, feedId],
      });
      router.replace(`/community/detail/${feedId}/comment/${commentId}`);
      addToast({
        message: '댓글을 수정했어요.',
        type: 'base',
      });
    },
    ...mutationOptions,
  });
}

export {
  useCreateComment,
  useDeleteComment,
  useGetCommentDetail,
  useGetCommentList,
  useGetCommentInfo,
  useEditComment,
  useDeleteCommentInList,
};
