'use client';

import { useModal } from '@/hooks/useModal';

import PageHeader from '@/components/header/PageHeader';
import DetailLike from './DetailLike';
import DetailMoreView from './DetailMoreView';
import Share from '../../Share';
import { CommunityDetail } from '@/service/community';
import FeedShareIcon from '@/components/icon/commonIcon/FeedShareIcon';

type Props = {
  feedInfo?: CommunityDetail;
};

export default function DetailHeader({ feedInfo }: Props) {
  const shareImages = feedInfo?.images.map((imgData) => imgData.imageUri)[feedInfo.images.length - 1];
  const shareModal = useModal();

  return (
    <PageHeader backUrl="/">
      <ul className="flex items-center space-x-2">
        <li className="w-10 h-10 flex justify-center items-center">
          <FeedShareIcon onShare={shareModal.show} />
        </li>
        <li className="w-10 h-10 flex justify-center items-center">
          <DetailLike isMyRecommendation={feedInfo?.viewer.hasMyRecommendation} feedId={feedInfo?.feedId} />
        </li>
        <li>
          <DetailMoreView feedContent={feedInfo?.contents} feedWriter={feedInfo?.writer.userName} />
        </li>
      </ul>

      <Share
        shareImageUrl={shareImages}
        shareDescription={feedInfo?.contents}
        hideShareModal={shareModal.hide}
        isShareModal={shareModal.isVisible}
      />
    </PageHeader>
  );
}
