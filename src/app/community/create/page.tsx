import CreateForm from '@/components/feed/community/CreateForm';
import { Suspense } from 'react';

export default function CreateFeedPage() {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateForm />
      </Suspense>
    </section>
  );
}
