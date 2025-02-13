'use client';

import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollPosition';
import { useSelectItem } from '@/hooks/useSelect';
import useUser from '@/hooks/useUser';

import SSRSafeSuspense from './common/SSRSafeSuspense';
import Navbar from './navigation/Navbar';
import Toast from './common/Toast';
import AddButton from './feed/AddButton';
import CommunityList from './feed/community/CommunityList';
import CommunitySkeleton from './feed/community/CommunitySkeleton';
import ListCategory from './feed/ListCategory';
import MainHeader from './header/MainHeader';

import { HOME_HEADER_TABS, HeaderTab } from '@/data';

export default function Home() {
  const { selectItem, handleSelectItem } = useSelectItem<HeaderTab>({ title: '커뮤니티', type: 'COMMUNITY' });
  const { isScrolledPercentage } = useScrollProgress(43);
  const { isLoggedIn, isUserError } = useUser();

  return (
    <section>
      <MainHeader title={selectItem?.title} isScrolled={isScrolledPercentage} isScrolledLogo />
      <ListCategory
        headerTabList={[...HOME_HEADER_TABS]}
        handleHeaderTab={handleSelectItem}
        headerTab={selectItem}
        categoryType="community"
      />

      <SSRSafeSuspense fallback={<CommunitySkeleton skeletonLength={10} />}>
        <CommunityList headerTab={selectItem} isLoggedIn={isLoggedIn} isUserError={isUserError} />
      </SSRSafeSuspense>

      <AddButton headerTab={selectItem} isLoggedIn={isLoggedIn} isUserError={isUserError} />
      <Toast isShowing bottom="4.125rem" />
      <Navbar />
    </section>
  );
}
