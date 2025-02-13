import LikeIcon from '../../icon/commonIcon/likeIcon.svg';
import CommentIcon from '../../icon/commonIcon/commentIcon.svg';
import ViewIcon from '../../icon/commonIcon/viewIcon.svg';
import AvatarSkeleton from '../../icon/commonIcon/avatarSkeleton.svg';
import NameSkeleton from '../../icon/commonIcon/nameSkeleton.svg';
import TeamAndTimeSkeleton from '../../icon/commonIcon/teamAndTimeSkeleton.svg';
import { ContentSkeleton } from '../../icon/commonIcon/ContentSkeleton';

const feedIcons = [
  {
    title: '댓글',
    Icon: CommentIcon,
  },
  {
    title: '좋아요',
    Icon: LikeIcon,
  },
  {
    title: '조회',
    Icon: ViewIcon,
  },
];

interface Props {
  skeletonLength?: number;
}

export default function CommunitySkeleton({ skeletonLength = 1 }: Props) {
  return Array.from({ length: skeletonLength }).map((_, index) => (
    <li key={index} className="p-4 space-y-4 list-none animate-pulse">
      <div className="flex items-center space-x-2">
        <AvatarSkeleton />
        <div className="space-y-1">
          <NameSkeleton />
          <TeamAndTimeSkeleton />
        </div>
      </div>

      <div className="space-y-1">
        <ContentSkeleton />
        <ContentSkeleton />
      </div>

      <ul className="flex items-center justify-between px-4">
        {feedIcons.map((item) => (
          <li key={item.title} className="flex items-center space-x-1">
            <item.Icon />
            <span className="text-body-sm font-regular leading-body-sm text-secondary-N200">{item.title}</span>
          </li>
        ))}
      </ul>
    </li>
  ));
}
