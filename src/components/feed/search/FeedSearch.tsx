'use client';

import { useModal } from '@/hooks/useModal';
import useUser from '@/hooks/useUser';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CommonDivider from '@/components/common/CommonDivider';
import PageHeader from '@/components/header/PageHeader';
import LoginModal from '@/components/signup/LoginModal';
import { HeaderTab } from '@/data';
import CommunityList from '../community/CommunityList';
import CommunitySkeleton from '../community/CommunitySkeleton';
import FeedSearchForm, { SearchForm } from './FeedSearchForm';
import SearchHeader from './SearchHeader';

interface Props {
  searchHeaderTabs: HeaderTab[];
}

export default function FeedSearch({ searchHeaderTabs }: Props) {
  const searchKeyword = useSearchParams().get('keyword');
  const { userError } = useUser();
  const modal = useModal();
  const formMethod = useForm<SearchForm>();
  const [headerTab, setHeaderTab] = useState<HeaderTab>({
    title: '전체',
    type: 'ALL',
  });

  const handleHeaderTab = useCallback((selectedTitle: HeaderTab) => {
    setHeaderTab(selectedTitle);
  }, []);

  useEffect(() => {
    if (userError?.statusCode === 401) modal.show();
  }, [modal, userError?.statusCode]);

  return (
    <div>
      <PageHeader backUrl="/" title="검색" />
      <FormProvider {...formMethod}>
        <FeedSearchForm />
      </FormProvider>

      <SearchHeader handleHeaderTab={handleHeaderTab} headerTab={headerTab} headerTabList={searchHeaderTabs} />

      <CommonDivider type="sm" />

      <Suspense fallback={<CommunitySkeleton skeletonLength={10} />}>
        <CommunityList headerTab={headerTab} searchKeyword={searchKeyword} />
      </Suspense>

      <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
    </div>
  );
}
