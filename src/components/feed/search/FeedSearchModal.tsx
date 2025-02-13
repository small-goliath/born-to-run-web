'use client';

import { usePathname } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import PageHeader from '@/components/header/PageHeader';
import FeedSearchKeywordList from './FeedSearchKeywordList';
import FeedSearchForm, { SearchForm } from './FeedSearchForm';

type Props = {
  onCloseSearchModal: () => void;
  isActiveSearch: boolean;
};

export default function FeedSearchModal({ onCloseSearchModal }: Props) {
  const pathname = usePathname();
  const formMethod = useForm<SearchForm>();

  return (
    <div className="bg-white m-auto max-w-sm md:max-w-md h-[100vh]">
      <PageHeader backUrl={pathname} title="검색" closeIconType="close" onBackHandler={onCloseSearchModal} />
      <FormProvider {...formMethod}>
        <div className="relative pt-14 px-4">
          <FeedSearchForm />
          <FeedSearchKeywordList />
        </div>
      </FormProvider>
    </div>
  );
}
