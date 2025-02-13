'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import useUser from '@/hooks/useUser';
import { useGetCommentDetail } from '@/hooks/queries/community/useComment';
import { useModal } from '@/hooks/useModal';

import CommentDetailHeader from './CommentDetailHeader';
import CommentForm from '../CommentForm';
import Writer from '@/components/feed/Writer';
import Contents from '@/components/feed/community/Contents';
import FeedIcons from '@/components/feed/community/InteractionIcons';
import CommonDivider from '@/components/common/CommonDivider';
import ReportModal from '@/components/feed/community/report/ReportModal';
import Toast from '@/components/common/Toast';
import ReCommentList from './ReCommentsList';
import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';
import InfoModal from '@/components/modal/InfoModal';

export default function CommentDetail() {
  const params = useSearchParams();
  const reportState = params.get('reportState');
  const router = useRouter();
  const pathName = usePathname().split('/');
  const feedId = Number(pathName[3]);
  const commentId = Number(pathName[5]);
  const { userInfo } = useUser();
  const modal = useModal();
  const reportSuccessModal = useModal();
  const reportFailedModal = useModal();

  const closeReportSuccessStateModal = useCallback(() => {
    reportSuccessModal.hide();
    router.replace(`/community/detail/${feedId}/comment/${commentId}`);
  }, [commentId, feedId, reportSuccessModal, router]);

  const closeErrorReportModal = useCallback(() => {
    reportFailedModal.hide();
    router.push(`/community/detail/${feedId}/comment/${commentId}`);
  }, [commentId, feedId, reportFailedModal, router]);

  useEffect(() => {
    if (reportState === 'success') {
      reportSuccessModal.show();
    }
    if (reportState === 'fail') {
      reportFailedModal.show();
    }
  }, [reportFailedModal, reportState, reportSuccessModal]);

  const { data: comment, isError: isCommentDetailError, error: commentDetailError } = useGetCommentDetail(commentId);

  const isMyComment = userInfo?.userName === comment?.writer.userName;
  const commentCount = comment?.reComments.length;

  useEffect(() => {
    if (isCommentDetailError && commentDetailError?.statusCode === 401) {
      modal.show();
    }
  }, [commentDetailError?.statusCode, isCommentDetailError, modal]);

  return (
    <div>
      <CommentDetailHeader
        feedId={feedId}
        commentId={commentId}
        isMyComment={isMyComment}
        commentContents={comment?.contents}
      />
      {comment && (
        <div className="px-4">
          <div className="my-4">
            <Writer onProfilePage={() => {}} registeredAt={comment?.registeredAt} writerInfo={comment?.writer} />
            <div className="my-4">
              <Contents contents={comment.contents} isMoreViewBtnNeed={false} />
            </div>

            <button onClick={() => {}} className="mb-4">
              <FeedIcons type="chat" count={commentCount || 0} title="댓글" isMyComment={isMyComment} />
            </button>
          </div>
        </div>
      )}

      <CommonDivider type="sm" />
      <CommentForm feedId={feedId} parentCommentId={commentId} />

      {comment?.reComments && comment.reComments.length !== 0 && (
        <ReCommentList reComments={comment?.reComments} feedId={feedId} />
      )}

      <ReportModal isActiveReportModal={reportSuccessModal.isVisible} closeReportModal={closeReportSuccessStateModal} />

      {isCommentDetailError &&
        (commentDetailError?.statusCode === 401 ? (
          <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
        ) : (
          <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />
        ))}

      {reportFailedModal.isVisible && (
        <InfoModal
          isActiveModal={reportFailedModal.isVisible}
          closeModal={closeErrorReportModal}
          title="중복 신고 불가"
          description="현재 신고를 검토중 입니다. 빠르게 확인 후 조치하도록 하겠습니다. 감사합니다."
        />
      )}

      <Toast isShowing isClearOnPathChange />
    </div>
  );
}
