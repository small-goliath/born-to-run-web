'use client';

import CommentIcon from '../../icon/commonIcon/commentIcon.svg';
import ViewIcon from '../../icon/commonIcon/viewIcon.svg';
import LikeIcon from '../../icon/commonIcon/likeIcon.svg';
import ActiveLikeIcon from '../../icon/commonIcon/activeLikeIcon.svg';
import ActiveCommentIcon from '../../icon/commonIcon/activeCommentIcon.svg';
import { cls } from '@/utils/cls';

type Props = {
  title: '댓글' | '좋아요' | '조회';
  type: 'chat' | 'like' | 'view';
  count: number;
  isMyFeedLike?: boolean;
  isMyComment?: boolean;
  onClick?: () => void;
};

export default function FeedIcons({ count, type, title, onClick, isMyComment, isMyFeedLike }: Props) {
  return (
    <li
      onClick={onClick}
      className={cls(
        type === 'like' ? 'justify-center' : '',
        type === 'view' ? 'justify-end' : '',
        'flex items-center space-x-1 cursor-pointer w-full py-2'
      )}
    >
      {type === 'chat' && <span>{isMyComment ? <ActiveCommentIcon /> : <CommentIcon />}</span>}
      {type === 'like' && <span>{isMyFeedLike ? <ActiveLikeIcon /> : <LikeIcon />}</span>}
      {type === 'view' && (
        <span>
          <ViewIcon />
        </span>
      )}
      <span className="text-body-sm font-regular leading-body-sm text-secondary-N200">
        {count === 0 ? title : count > 999 ? '999+' : count}
      </span>
    </li>
  );
}
