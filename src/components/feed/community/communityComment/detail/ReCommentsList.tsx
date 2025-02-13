import { ReComment } from '@/service/comment';
import Comment from '../Comment';

type Props = {
  reComments: ReComment[];
  feedId: number;
};

export default function ReCommentList({ reComments, feedId }: Props) {
  return (
    <ul>
      {reComments.map((comment) => (
        <li key={comment.commentId} className="pt-2">
          <div>
            <Comment
              commentId={comment.commentId}
              commentDate={comment.registeredAt}
              contents={comment.contents}
              writer={comment.writer}
              isMyComment={comment.isMyComment}
              isRecomment
              feedId={feedId}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
