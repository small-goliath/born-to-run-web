import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDeleteComment } from '@/hooks/queries/community/useComment';
import { useModal } from '@/hooks/useModal';
import { useCommunityMoreView } from '@/hooks/useCommunityMoreView';

import Contents from '../Contents';
import LoginModal from '@/components/signup/LoginModal';
import CommentLeftBar from './CommentLeftBar';
import CommunityMoreSetting from '../CommunityMoreSetting';
import ErrorModal from '../../../modal/ErrorModal';
import Writer from '../../Writer';
import FeedIcons from '../InteractionIcons';
import DeleteModal from '../../DeleteModal';

import { CommentWriter } from '@/service/comment';

type Props = {
  feedId: number;
  commentId: number;
  writer: CommentWriter;
  contents: string;
  commentDate: Date;
  isMyComment: boolean;
  isRecomment?: boolean;
  reCommentQty?: number;
};

export default function Comment({
  isMyComment,
  commentId,
  contents,
  writer,
  commentDate,
  feedId,
  isRecomment,
  reCommentQty,
}: Props) {
  const router = useRouter();
  const errorModal = useModal();
  const deleteModal = useModal();
  const {
    mutate: deleteCommentMutate,
    isError: isDeleteCommentError,
    error: deleteCommentError,
  } = useDeleteComment(commentId, {
    onError: () => {
      errorModal.show();
    },
  });

  const onProfilePage = () => {};

  const onCommentDetail = useCallback(() => {
    if (!feedId) return;
    router.push(`/community/detail/${feedId}/comment/${commentId}`);
  }, [commentId, feedId, router]);

  const onEdit = useCallback(() => {
    if (!commentId || !feedId) return router.replace('/');
    router.push(`/community/detail/${feedId}/comment/${commentId}/edit`);
  }, [commentId, feedId, router]);

  const onReport = () => {
    router.push(`/report?type=comment&commentId=${commentId}&feedId=${feedId}&commentType=list`);
  };

  const onDelete = useCallback(async () => {
    if (!isMyComment) return;
    deleteCommentMutate({});
  }, [deleteCommentMutate, isMyComment]);

  const { handlePopUpItem } = useCommunityMoreView({
    onEdit,
    onDeleteModal: deleteModal.show,
    onReport,
    copyText: contents,
  });

  return (
    <li className={`${isMyComment ? 'bg-secondary-N10' : ''} pt-2 min-h-[150px]`}>
      <div className="flex items-center justify-between">
        <div className="px-4">
          <Writer writerInfo={writer} onProfilePage={onProfilePage} registeredAt={commentDate} />
        </div>

        <CommunityMoreSetting moreIconType="base" isMyMoreView={isMyComment} handlePopUpItem={handlePopUpItem} />
      </div>

      <div className="flex mt-2 px-4">
        <CommentLeftBar />

        <div className="ml-2">
          <div className={`${isRecomment ? 'mb-6' : 'mb-1'}`}>
            <Contents contents={contents} limitLineHight={4} isMoreViewBtnNeed />
          </div>
          {!isRecomment && (
            <button onClick={onCommentDetail} className="mb-4">
              <FeedIcons type="chat" count={reCommentQty || 0} title="댓글" />
            </button>
          )}
        </div>
      </div>

      {isDeleteCommentError &&
        (deleteCommentError.statusCode === 401 ? (
          <LoginModal isLoginModal={errorModal.isVisible} closeLogin={errorModal.hide} />
        ) : (
          <ErrorModal isActive={errorModal.isVisible} closeModal={errorModal.hide} />
        ))}

      <DeleteModal
        onCloseModal={deleteModal.hide}
        showDeleteModal={deleteModal.isVisible}
        onDelete={onDelete}
        deleteType="댓글"
      />
    </li>
  );
}
