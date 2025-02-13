import InteractionIcons from './InteractionIcons';

type Props = {
  commentQty: number;
  viewQty: number;
  recommendationQty: number;
  hasComment: boolean;
  hasMyRecommendation: boolean;
  handleFeedLikeButton: () => void;
  onDetailFeedPage?: () => void;
};

export default function ActionGroup({
  commentQty,
  hasComment,
  hasMyRecommendation,
  recommendationQty,
  viewQty,
  handleFeedLikeButton,
  onDetailFeedPage,
}: Props) {
  return (
    <ul className="flex items-center ml-4 space-x-2 justify-between">
      <InteractionIcons
        count={commentQty}
        type="chat"
        title="댓글"
        isMyComment={hasComment}
        onClick={onDetailFeedPage}
      />
      <InteractionIcons
        count={recommendationQty}
        type="like"
        title="좋아요"
        isMyFeedLike={hasMyRecommendation}
        onClick={handleFeedLikeButton}
      />
      <InteractionIcons onClick={onDetailFeedPage} count={viewQty} type="view" title="조회" />
    </ul>
  );
}
