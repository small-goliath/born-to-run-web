'use client';

import { useGetCommentList } from '@/hooks/queries/community/useComment';
import { useModal } from '@/hooks/useModal';
import { useRetryHandler } from '@/hooks/useRetryHandler';
import { useEffect } from 'react';

import ErrorModal from '../../../modal/ErrorModal';
import Comment from './Comment';
import ReComment from './ReComment';

type Props = {
  feedId: number;
};

export default function CommentList({ feedId }: Props) {
  const { data: commentList, isError: isCommentListError, refetch } = useGetCommentList(feedId);
  const modal = useModal();

  const { handleRetry, isRetry } = useRetryHandler({
    handler: () => refetch(),
  });

  useEffect(() => {
    if (isCommentListError) return modal.show();
  }, [isCommentListError, modal]);

  return (
    <div>
      <ul>
        {commentList?.comments.map((comment) => (
          <div key={comment.id}>
            {comment.isReComment ? (
              <ReComment
                feedId={feedId}
                commentDate={comment.registeredAt}
                commentId={comment.id}
                contents={comment.contents}
                isMyComment={comment.isMyComment}
                writer={comment.writer}
              />
            ) : (
              <Comment
                feedId={feedId}
                commentDate={comment.registeredAt}
                commentId={comment.id}
                contents={comment.contents}
                writer={comment.writer}
                isMyComment={comment.isMyComment}
                reCommentQty={comment.reCommentQty}
              />
            )}
          </div>
        ))}
      </ul>

      {isCommentListError && isRetry && (
        <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} handleRetry={handleRetry} />
      )}
    </div>
  );
}
