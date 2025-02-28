'use client';

import { useEditComment, useGetCommentInfo } from '@/hooks/queries/community/useComment';
import { useModal } from '@/hooks/useModal';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import SolidButton from '@/components/common/commonButton/SolidButton';
import CreateContent from '@/components/feed/community/CreateContent';
import PageHeader from '@/components/header/PageHeader';
import ErrorModal from '@/components/modal/ErrorModal';
import LoginModal from '@/components/signup/LoginModal';
import { queryKeys } from '@/constants';
import { queryClient } from '@/QueryProvider';
import { CommentDetailContent } from '@/service/comment';

export default function CommentEditForm() {
  const pathName = usePathname().split('/');
  const router = useRouter();
  const feedId = Number(pathName[3]);
  const commentId = Number(pathName[5]);
  const modal = useModal();
  const comment = queryClient.getQueryData<CommentDetailContent>([queryKeys.COMMENT.DETAIL, commentId]);

  const { data: commentInfo } = useGetCommentInfo(commentId, {
    enabled: !comment,
  });

  const [contents, setContents] = useState(comment?.contents || commentInfo?.contents);

  const {
    mutate: commentEditMutate,
    isError: isEditError,
    error: commentEditError,
    isPending: isCommentEditLoading,
  } = useEditComment(
    {
      commentId,
      feedId,
    },
    {
      onError: () => {
        modal.show();
      },
    }
  );

  useEffect(() => {
    if (commentInfo?.contents || comment?.contents) {
      setContents(commentInfo?.contents || comment?.contents);
    }
  }, [comment?.contents, commentInfo]);

  const handleContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const onSubmit = () => {
    if (!contents || contents === '' || isCommentEditLoading) return;
    commentEditMutate({
      id: commentId,
      contents,
    });
  };

  useEffect(() => {
    if (!commentId) {
      router.replace('/');
    }
  }, [commentId, router]);

  const isUnchanged = comment?.contents === contents;

  return (
    <form>
      <PageHeader
        backUrl={`/community/detail/${feedId}/comment/${commentId}/`}
        isShadow
        closeIconType="close"
        title="댓글 수정"
      >
        <SolidButton
          type="button"
          title="완료"
          height="h-[2.5rem]"
          onClick={onSubmit}
          disabled={isUnchanged}
          isLoading={isCommentEditLoading}
        />
      </PageHeader>

      <div className="mt-2">
        <CreateContent value={contents} onChange={handleContents} />
      </div>

      {isEditError &&
        (commentEditError.statusCode === 401 ? (
          <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
        ) : (
          <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />
        ))}
    </form>
  );
}
