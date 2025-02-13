'use client';

import { useModal } from '@/hooks/useModal';
import { useCallback } from 'react';

//import PageMoreViewSetting from '../../PageMoreViewSetting';

import CopyIcon from '@/components/icon/commonIcon/CopyIcon';
import { queryClient } from '@/QueryProvider';
import { queryKeys } from '@/constants';
import { MarathonDetail } from '@/service/marathon';
import { addSpaceToDateParts, parseDayOfWeek } from '@/utils/formatDate';
import { copyToClipboard } from '@/utils/textCopy';

interface Props {
  marathonId: number;
}

export default function MarathonMoreSetting({ marathonId }: Props) {
  const moreViewModal = useModal();
  const detail = queryClient.getQueryData<MarathonDetail>([queryKeys.MARATHON.GET_MARATHON_DETAIL, marathonId]);

  const formatScheduleTimePart = detail?.schedule.split(' ')[1].replace(':', ' ');
  const allText =
    detail &&
    `
       ${detail?.title}
    일시: ${addSpaceToDateParts(detail?.schedule)} (${parseDayOfWeek(detail?.schedule)}) ${formatScheduleTimePart}
    장소: ${detail?.venue}
    종목: ${detail?.course.replace(/,/g, ', ')}
    접수기간: ${addSpaceToDateParts(detail?.duration.split('~')[0])} ~ ${addSpaceToDateParts(
      detail?.duration.split('~')[1]
    )}
    대표자: ${detail?.owner}
    연락처: ${detail?.contact}
    E-mail: ${detail?.email}
    홈페이지: ${detail?.homepage}
    대회장: ${detail?.venueDetail}
    주최단체: ${detail?.host}
    비고: ${detail?.remark}
    `;

  const handleSelectItem = useCallback(() => {
    if (!marathonId || !detail?.marathonId || !allText) return;
    copyToClipboard(allText);
  }, [allText, detail?.marathonId, marathonId]);

  return (
    <>
      {/* <PageMoreViewSetting
        list={moreViewList}
        onSelectPopupItem={handleSelectItem}
        moreIconType="circle"
        isShowPopUp={moreViewModal.isVisible}
        onTogglingPopup={moreViewModal.toggling}
        onClosePopup={moreViewModal.hide}
      /> */}
    </>
  );
}

const moreViewList = [
  {
    title: '내용 복사',
    icon: <CopyIcon />,
    key: 'copy',
  },
];
