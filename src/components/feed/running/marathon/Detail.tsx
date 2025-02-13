'use client';

import { useGetMarathonDetail } from '@/hooks/queries/running/useMarathon';
import { useModal } from '@/hooks/useModal';
import { useToastStore } from '@/store/toastStore';
import { useEffect } from 'react';
import { useScrollToTop } from '@/hooks/useScrollPosition';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import DetailLabel from './DetailLabel';
import CopyIcon from '@/components/icon/commonIcon/CopyIcon';
import CommonDivider from '@/components/common/CommonDivider';
import Badge from '../../Badge';
import DetailContent from './DetailContent';
import ArrowRightIcon from '@/components/icon/commonIcon/ArrowRightIcon';
import Toast from '@/components/common/Toast';
import ErrorModal from '@/components/modal/ErrorModal';
import MarathonDetailHeader from './DetailHeader';

import { addSpaceToDateParts, daysUntilCurrentDate, parseDayOfWeek } from '@/utils/formatDate';
import { copyToClipboard } from '@/utils/textCopy';
const Maps = dynamic(() => import('../../Maps'), {
  ssr: false,
});

interface Props {
  marathonId: number;
}

export default function MarathonDetail({ marathonId }: Props) {
  const { data: detail, error: detailError, isSuccess } = useGetMarathonDetail(marathonId);
  const modal = useModal();
  const { addToast } = useToastStore();
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  useEffect(() => {
    if (detailError) {
      modal.show();
    }
  }, [detailError, modal]);

  const formatScheduleTimePart = detail?.schedule.split(' ')[1].replace(':', ' ');

  const handleLocationCopy = async (location?: string) => {
    if (!location) return;
    const isSuccess = await copyToClipboard(location);
    const toastMessage = isSuccess ? '주소를 복사했어요.' : '주소 복사에 실패했어요.';
    addToast({
      type: isSuccess ? 'base' : 'error',
      message: toastMessage,
    });
  };

  const untilCurrentDate = detail && daysUntilCurrentDate(detail.schedule.split(' ')[0]);

  return (
    <div>
      <MarathonDetailHeader marathonId={marathonId} isBookmark={detail?.isBookmarking} />
      <div className="mt-4 py-2 px-4">
        <Badge text={`D-${untilCurrentDate}`} scale="lg" isCircle />
        <h1 className="my-4 text-title-xl font-bold leading-title-xl">{detail?.title}</h1>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center">
            <DetailLabel title="일시" />
            {detail?.schedule && (
              <div className="flex items-center gap-1">
                <DetailContent content={addSpaceToDateParts(detail.schedule)} />
                <DetailContent content={`(${parseDayOfWeek(detail.schedule)}) ${formatScheduleTimePart}`} />
              </div>
            )}
          </div>
          <div className="flex">
            <DetailLabel title="장소" />
            <div>
              <DetailContent content={detail?.venue} />
              <button onClick={() => handleLocationCopy(detail?.location)} className="h-10 flex items-center gap-2">
                <span className="text-label-sm font-bold text-primary-G400">주소 복사</span>
                <CopyIcon size={16} color="#50C85A" />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <DetailLabel title="종목" />
            <DetailContent content={detail?.course.replace(/,/g, ', ')} />
          </div>
        </div>
      </div>
      <CommonDivider type="lg" />

      <div className="p-4">
        <h2 className="text-title-lg leading-title-lg tracking-title-lg text-secondary-N900 font-bold mb-2">
          상세 정보
        </h2>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col">
            <DetailLabel title="접수기간" />
            {detail?.duration && (
              <div className="flex items-center gap-1">
                <DetailContent content={addSpaceToDateParts(detail.duration.split('~')[0])} hasPadding />
                <span>~</span>
                <DetailContent content={addSpaceToDateParts(detail.duration.split('~')[1])} hasPadding />
              </div>
            )}
          </div>

          <CommonDivider type="sm" />

          <div>
            <DetailLabel title="대표자" />
            <DetailContent content={detail?.owner} hasPadding />
          </div>

          <div>
            <DetailLabel title="연락처" />
            <DetailContent content={detail?.contact} hasPadding isAccent />
          </div>

          <div>
            <DetailLabel title="E-mail" />
            <DetailContent content={detail?.email} hasPadding isAccent />
          </div>

          <div>
            <DetailLabel title="홈페이지" />
            <div className="w-[6.25rem] h-[6.25rem]" />
            {detail?.homepage && (
              <Link href={detail?.homepage} target="_blank">
                <DetailContent content={detail?.homepage} hasPadding isAccent />
              </Link>
            )}
          </div>

          <div>
            <DetailLabel title="대회장" />
            <DetailContent content={detail?.venueDetail} hasPadding />
            <Link
              href={`https://map.naver.com/v5/search/${detail?.venueDetail}`}
              target="_blank"
              className="flex items-center gap-2 h-10"
            >
              <p className="text-label-sm tracking-label-sm text-primary-G400">네이버 지도에서 보기</p>
              <ArrowRightIcon color="#50C85A" />
            </Link>
          </div>

          <div className="w-full h-[12rem] relative">
            <Maps address={detail?.venueDetail} />
          </div>

          <CommonDivider type="sm" />

          <div>
            <DetailLabel title="주최단체" />
            <DetailContent content={detail?.host} hasPadding />
          </div>

          <div className="flex flex-col gap-2">
            <DetailLabel title="비고" />
            <DetailContent content={detail?.remark} />
          </div>
        </div>
      </div>

      {detailError && <ErrorModal closeModal={modal.hide} isActive={modal.isVisible} />}
      <Toast isShowing={isSuccess} isClearOnPathChange />
    </div>
  );
}
