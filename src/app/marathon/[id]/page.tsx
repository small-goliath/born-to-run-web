import NotFound from '@/app/not-found';
import MarathonDetail from '@/components/feed/running/marathon/Detail';

interface Props {
  params: { id: string };
  searchParams: {};
}

export default function MarathonDetailPage({ params }: Props) {
  const marathonId = Number(params.id);
  if (isNaN(marathonId)) {
    return NotFound();
  }
  return (
    <section>
      <MarathonDetail marathonId={marathonId} />
    </section>
  );
}
