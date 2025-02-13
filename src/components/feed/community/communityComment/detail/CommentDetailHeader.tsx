'use client';

import { useModal } from '@/hooks/useModal';

import PageHeader from '@/components/header/PageHeader';
import CommentDetailMoreView from './CommentDetailMoreView';
import FeedShareIcon from '@/components/icon/commonIcon/FeedShareIcon';
import Share from '../../../Share';

type Props = {
  feedId: number;
  isMyComment: boolean;
  commentId: number;
  commentContents?: string;
};

export default function CommentDetailHeader({ feedId, isMyComment, commentId, commentContents }: Props) {
  const shareModal = useModal();

  return (
    <PageHeader backUrl={`/community/detail/${feedId}`}>
      <ul className="flex items-center space-x-2">
        <li>
          <FeedShareIcon onShare={shareModal.show} />
        </li>
        <li>
          <CommentDetailMoreView feedId={feedId} commentId={commentId} isMyComment={isMyComment} />
        </li>
      </ul>

      <Share shareDescription={commentContents} hideShareModal={shareModal.hide} isShareModal={shareModal.isVisible} />
    </PageHeader>
  );
}
