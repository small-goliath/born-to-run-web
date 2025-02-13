'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useModal } from '@/hooks/useModal';
import { useDeleteCommentInList } from '@/hooks/queries/community/useComment';
import { useCommunityMoreView } from '@/hooks/useCommunityMoreView';

import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';
import CommunityMoreSetting from '../../CommunityMoreSetting';
import DeleteModal from '@/components/feed/DeleteModal';

type Props = {
  feedId: number;
  commentId: number;
  isMyComment: boolean;
};

export default function CommentDetailMoreView({ feedId, commentId, isMyComment }: Props) {
  const router = useRouter();
  const modal = useModal();
  const deleteModal = useModal();
  const onEdit = useCallback(() => {
    router.push(`/community/detail/${feedId}/comment/${commentId}/edit`);
  }, [commentId, feedId, router]);

  const onReport = () => {
    router.push(`/report?type=comment&feedId=${feedId}&commentId=${commentId}&commentType=detail`);
  };

  const {
    mutate: commentDeleteMutate,
    isPending: isCommentDeleteLoading,
    isError: isCommentDeleteError,
    error: commentDeleteError,
  } = useDeleteCommentInList(
    { feedId, commentId },
    {
      onError: () => {
        modal.show();
      },
    }
  );

  const onDelete = useCallback(() => {
    commentDeleteMutate(commentId);
  }, [commentDeleteMutate, commentId]);

  const { handlePopUpItem } = useCommunityMoreView({
    onEdit,
    onReport,
    onDeleteModal: deleteModal.show,
  });

  return (
    <>
      <CommunityMoreSetting moreIconType="circle" isMyMoreView={isMyComment} handlePopUpItem={handlePopUpItem} />

      <DeleteModal
        onCloseModal={deleteModal.hide}
        showDeleteModal={deleteModal.isVisible}
        onDelete={onDelete}
        deleteType="댓글"
      />

      {isCommentDeleteError &&
        (commentDeleteError.statusCode === 401 ? (
          <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
        ) : (
          <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />
        ))}
    </>
  );
}
