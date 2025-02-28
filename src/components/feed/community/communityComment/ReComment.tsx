import Link from 'next/link';

import CommentLeftBar from './CommentLeftBar';
import Writer from '../../Writer';
import Contents from '../Contents';

import { CommentWriter } from '@/service/comment';

type Props = {
  feedId?: number;
  id: number;
  writer: CommentWriter;
  contents: string;
  commentDate: Date;
  isMyComment: boolean;
};

export default function ReComment({ feedId, commentDate, id, contents, isMyComment, writer }: Props) {
  const onProfilePage = () => {};

  return (
    <div className={`${isMyComment ? 'bg-secondary-N10' : ''} flex px-4 `}>
      <CommentLeftBar />

      <div className="py-2">
        <Link href={`/community/detail/${feedId}/comment/${id}`}>
          <div className="space-y-2 mb-2">
            <Writer writerInfo={writer} onProfilePage={onProfilePage} registeredAt={commentDate} />
          </div>
          <div className="mb-4 ml-10">
            <Contents contents={contents} />
          </div>
        </Link>
      </div>
    </div>
  );
}
