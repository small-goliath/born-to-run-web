'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useGetCommunityDetailFeed } from '@/hooks/queries/community/useCommunity';
import { useModal } from '@/hooks/useModal';

import NotContent from '../../NotContent';
import CommonDivider from '@/components/common/CommonDivider';
import CommentList from '@/components/feed/community/communityComment/CommentList';
import Writer from '../../Writer';
import Contents from '../Contents';
import ActionGroup from '../ActionGroup';
import CommunitySkeleton from '../CommunitySkeleton';
import CommentForm from '@/components/feed/community/communityComment/CommentForm';

import Toast from '@/components/common/Toast';
import ImageSlider from '../../ImageSlider';
import ReportModal from '@/components/feed/community/report/ReportModal';
import InfoModal from '@/components/modal/InfoModal';
import DetailHeader from './DetailHeader';
import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface Props {
  feedId: number;
}

export default function Detail({ feedId }: Props) {
  const params = useSearchParams();
  const reportState = params.get('reportState');
  const router = useRouter();
  const reportModal = useModal();
  const errorModal = useModal();

  const { data: feedInfo, isPending: feedInfoLoading, error, isSuccess } = useGetCommunityDetailFeed(feedId);

  const closeReportSuccessStateModal = useCallback(() => {
    reportModal.hide();
    router.replace(`/community/detail/${feedId}`);
  }, [feedId, reportModal, router]);

  useEffect(() => {
    if (reportState === 'success') {
      reportModal.show();
    }
    if (reportState === 'fail') {
      errorModal.show();
    }
  }, [errorModal, reportModal, reportState]);

  const closeErrorReportModal = useCallback(() => {
    errorModal.hide();
    router.push(`/community/detail/${feedId}`);
  }, [errorModal, feedId, router]);

  const onProfilePage = useCallback(() => {}, []);

  return (
    <div>
      <DetailHeader feedInfo={feedInfo} />
      {feedInfoLoading ? (
        <CommunitySkeleton />
      ) : !feedInfo ? (
        <NotContent />
      ) : (
        <div className="py-4 px-4">
          <Writer writerInfo={feedInfo?.writer} onProfilePage={onProfilePage} registeredAt={feedInfo?.registeredAt} />

          {feedInfo.images && feedInfo.images.length > 0 && (
            <div className="my-4">
              <ImageSlider imageUris={feedInfo.images.map((image) => image.imageUri)} />
            </div>
          )}

          <div className="mb-4">
            <Contents contents={feedInfo.contents} isMoreViewBtnNeed={false} />
          </div>

          <div>
            <ActionGroup
              commentQty={feedInfo.commentQty}
              handleFeedLikeButton={() => {}}
              hasComment={feedInfo.viewer.hasMyComment}
              hasMyRecommendation={feedInfo.viewer.hasMyRecommendation}
              recommendationQty={feedInfo.recommendationQty}
              viewQty={feedInfo.viewQty}
            />
          </div>
        </div>
      )}

      <div className="my-2">
        <CommonDivider type="sm" />
      </div>

      <SSRSafeSuspense fallback={<LoadingSpinner />}>
        <CommentList feedId={feedId} />
      </SSRSafeSuspense>

      <CommentForm feedId={feedId} />

      <ReportModal closeReportModal={closeReportSuccessStateModal} isActiveReportModal={reportModal.isVisible} />
      {errorModal.isVisible && (
        <InfoModal
          isActiveModal={errorModal.isVisible}
          closeModal={closeErrorReportModal}
          title="중복 신고 불가"
          description="현재 신고를 검토중 입니다. 빠르게 확인 후 조치하도록 하겠습니다. 감사합니다."
        />
      )}

      <Toast isShowing={isSuccess} bottom="4.125rem" />
    </div>
  );
}
