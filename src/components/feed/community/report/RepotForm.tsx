'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useReport } from '@/hooks/queries/community/useReport';
import { useModal } from '@/hooks/useModal';

import CreateContent from '../CreateContent';
import TextButton from '../../../common/commonButton/TextButton';
import SolidButton from '../../../common/commonButton/SolidButton';
import ErrorModal from '../../../modal/ErrorModal';
import LoginModal from '../../../signup/LoginModal';
import { CommentAll, CommentDetailContent } from '@/service/comment';
import { CommunityDetail } from '@/service/community';
import { queryKeys } from '@/constants';
import { queryClient } from '@/QueryProvider';

type ReportForm = {
  reportName: string;
};

export default function ReportForm() {
  const router = useRouter();
  const params = useSearchParams();
  const modal = useModal();
  const notTargetModal = useModal();
  const [selfContents, setSelfContents] = useState('');
  const reportTargetType = params.get('type');
  const reportFeedId = Number(params.get('feedId'));
  const reportCommentId = Number(params.get('commentId'));
  const reportCommentType = params.get('commentType');

  const reportFeedTarget =
    reportTargetType === 'feed'
      ? queryClient.getQueryData<CommunityDetail>([queryKeys.COMMUNITY.DETAIL, reportFeedId])
      : undefined;

  const reportCommentDetailTarget =
    reportCommentType === 'detail'
      ? queryClient.getQueryData<CommentDetailContent>([queryKeys.COMMENT.DETAIL, reportCommentId])
      : undefined;

  const reportCommentListTarget =
    reportCommentType === 'list'
      ? queryClient
          .getQueryData<CommentAll>([queryKeys.COMMENT.ALL, reportFeedId])
          ?.comments.find((comment) => comment.commentId === reportCommentId)
      : undefined;

  const reportComment = reportCommentDetailTarget || reportCommentListTarget;

  const {
    mutate: reportMutate,
    isPending: isReportLoading,
    error: reportError,
    isError: isReportError,
  } = useReport(
    {
      reportCommentId,
      reportFeedId,
      reportCommentType,
    },
    {
      onError: (error) => {
        modal.show();
        if (error.statusCode === 400) {
          if (reportCommentType === 'detail') {
            router.replace(`/community/detail/${reportFeedId}/comment/${reportCommentId}?reportState=fail`);
            return;
          } else {
            router.replace(`/community/detail/${reportFeedId}?reportState=fail`);
            return;
          }
        }
      },
    }
  );

  const handleContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelfContents(e.target.value);
  };

  const onSubmit = useCallback(
    () => {
      // const targetUserId = reportFeedTarget?.writer.userId || reportComment?.writer.userId;
      // const targetContents = reportFeedTarget?.contents || reportComment?.contents;
      // if (!targetUserId || !targetContents) return notTargetModal.show();
      // reportMutate({
      //   targetUserId: targetUserId,
      //   basis: targetContents,
      //   reason: selfContents,
      // });
    },
    [
      // notTargetModal,
      // reportComment?.contents,
      // reportComment?.writer.userId,
      // reportFeedTarget?.contents,
      // reportFeedTarget?.writer.userId,
      // reportMutate,
      // selfContents,
    ]
  );

  useEffect(() => {
    if (reportTargetType === 'feed' && !reportFeedTarget) {
      router.replace('/');
      return;
    }
    if (reportTargetType === 'comment' && !reportComment) {
      router.replace('/');
    }
  }, [reportComment, reportCommentDetailTarget, reportFeedTarget, reportTargetType, router]);

  return (
    <div>
      <div className="border-t-[1px]">
        <CreateContent
          value={selfContents}
          onChange={handleContents}
          placeholder="신고 사유 직접 입력 (최대 1,000자)"
        />
      </div>

      <div className="absolute bottom-0 p-4 space-x-2 flex items-center w-full ">
        <div className="flex-1">
          <TextButton text="취소" type="back" hasBorder />
        </div>
        <div className="flex-1">
          <SolidButton
            type="submit"
            title="신고하기"
            height="h-[3.5rem]"
            isDanger
            disabled={!selfContents}
            isLoading={isReportLoading}
            onClick={onSubmit}
          />
        </div>
      </div>

      {isReportError && reportError.statusCode === 401 && (
        <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
      )}

      {isReportError && reportError.statusCode !== 401 && (
        <ErrorModal closeModal={modal.hide} isActive={modal.isVisible} />
      )}

      {notTargetModal.isVisible && (
        <ErrorModal
          isActive={notTargetModal.isVisible}
          title="불가능한 요청입니다."
          description="신고대상이 존재하지 않습니다."
          closeModal={modal.hide}
        />
      )}
    </div>
  );
}
