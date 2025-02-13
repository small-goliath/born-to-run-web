import NotFound from '@/app/not-found';
import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import CommunitySkeleton from '@/components/feed/community/CommunitySkeleton';
import Detail from '@/components/feed/community/communityDetail/Detail';

interface Props {
  params: { id: string };
  searchParams: {};
}

export default function CommunityDetailPage({ params }: Props) {
  const communityFeedId = Number(params.id);
  if (isNaN(communityFeedId)) {
    return NotFound();
  }

  return (
    <section>
      <SSRSafeSuspense fallback={<CommunitySkeleton />}>
        <Detail feedId={communityFeedId} />
      </SSRSafeSuspense>
    </section>
  );
}
