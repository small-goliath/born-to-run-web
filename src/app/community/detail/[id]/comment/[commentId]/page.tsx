import LoadingSpinner from '@/components/common/LoadingSpinner';
import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import CommentDetail from '@/components/feed/community/communityComment/detail/CommentDetail';

export default function CommentDetailPage() {
  return (
    <section>
      <SSRSafeSuspense fallback={<LoadingSpinner />}>
        <CommentDetail />
      </SSRSafeSuspense>
    </section>
  );
}
