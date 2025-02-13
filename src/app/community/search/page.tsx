import LoadingSpinner from '@/components/common/LoadingSpinner';
import FeedSearch from '@/components/feed/search/FeedSearch';
import { HOME_SEARCH_HEADER_TABS } from '@/data';
import { Suspense } from 'react';

export default function SearchPage() {
  return (
    <section>
      <Suspense fallback={<LoadingSpinner />}>
        <FeedSearch searchHeaderTabs={[...HOME_SEARCH_HEADER_TABS]} />
      </Suspense>
    </section>
  );
}
