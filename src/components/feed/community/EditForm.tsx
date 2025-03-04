'use client';

import { useEditCommunityFeed } from '@/hooks/queries/community/useCommunity';
import { useModal } from '@/hooks/useModal';
import { queryClient } from '@/QueryProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import SolidButton from '@/components/common/commonButton/SolidButton';
import CommonDivider from '@/components/common/CommonDivider';
import PageHeader from '@/components/header/PageHeader';
import ErrorModal from '@/components/modal/ErrorModal';
import LoginModal from '@/components/signup/LoginModal';
import CommunityTypeSelector from '../CommunityTypeSelector';
import CrewPublicSelector from '../CrewPublicSelector';
import PhotoSelector, { UploadFileState } from '../PhotoSelector';
import CreateContent from './CreateContent';

import { queryKeys } from '@/constants';
import { HeaderTab } from '@/data';
import { CommunityDetail, CrewPublic } from '@/service/community';

type Props = {
  isLoggedIn?: boolean;
  isUserError?: boolean;
};

export default function EditForm({isLoggedIn, isUserError}: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const modal = useModal();
  const feedId = Number(pathName.split('/').pop());
  const feedInfo = queryClient.getQueryData<CommunityDetail>([queryKeys.COMMUNITY.DETAIL, feedId]);
  const [contents, setContents] = useState(feedInfo?.contents);
  const [feedCategory, setFeedCategory] = useState<HeaderTab>({
    title: feedInfo?.category === 'COMMUNITY' ? '커뮤니티' : '마켓',
    type: feedInfo?.category || 'COMMUNITY',
  });
  const [accessLevel, setAccessLevel] = useState<CrewPublic | undefined>(feedInfo?.accessLevel);

  const [uploadFileState, setUploadFileState] = useState<UploadFileState>({
    loading: false,
    images: feedInfo?.images || [],
    isError: false,
  });

  const {
    mutate: feedEditMutate,
    isError: isFeedEditError,
    isPending: isFeedEditLoading,
    error: feedEditError,
  } = useEditCommunityFeed(feedId, {
    onError: () => {
      modal.show();
    },
  });

  const handleContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleUploadFileState = (state: UploadFileState) => {
    queryClient.setQueryData([queryKeys.COMMUNITY.DETAIL, feedId], (prev: CommunityDetail) => {
      if (prev) {
        return {
          ...prev,
          images: state.images,
        };
      }
      return prev;
    });
    setUploadFileState(state);
  };

  const handleFeedCategory = useCallback((selectedTab?: HeaderTab) => {
    if (!selectedTab) return;
    setFeedCategory(selectedTab);
  }, []);

  const handleChecked = useCallback(() => {
    setAccessLevel((prev) => (prev === 'ALL' ? 'IN_CREW' : 'ALL'));
  }, []);

  const isUnchanged =
    feedInfo?.accessLevel === accessLevel &&
    feedInfo?.contents === contents &&
    feedInfo?.category === feedCategory.type &&
    uploadFileState.images === feedInfo?.images;

  const onSubmit = () => {
    if (isUnchanged || !feedId || isFeedEditLoading) return;
    feedEditMutate({
      accessLevel,
      category: feedCategory.type,
      contents,
      feedId,
      imageIds: uploadFileState.images.map((image) => image.imageId),
    });
  };

  useEffect(() => {
    if (!feedInfo) {
      router.replace(`/community/detail/${feedId}`);
    }
  }, [router, feedInfo, feedId]);

  return (
    <form>
      <PageHeader backUrl={`/community/detail/${feedId}`} title="게시물 수정" isShadow closeIconType="close">
        <SolidButton
          type="button"
          title="완료"
          height="h-[2.5rem]"
          onClick={onSubmit}
          disabled={isUnchanged || isFeedEditError}
          isLoading={isFeedEditLoading}
        />
      </PageHeader>

      <div className="w-full flex justify-between items-center mt-1">
        <CommunityTypeSelector feedCategory={feedCategory} setFeedCategory={handleFeedCategory} />
        <CrewPublicSelector isCrewPublic={accessLevel === 'IN_CREW'} handleCheck={handleChecked} isLoggedIn={isLoggedIn} isUserError={isUserError}/>
      </div>

      <div className="my-2">
        <CommonDivider type="sm" />
      </div>

      <PhotoSelector onUploadFileState={handleUploadFileState} initialFiles={feedInfo?.images || []} />

      <div className="mt-2">
        <CommonDivider type="sm" />
      </div>

      <div className="">
        <CreateContent value={contents} onChange={handleContents} />
      </div>

      {isFeedEditError && feedEditError.statusCode === 401 && (
        <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
      )}

      {isFeedEditError && feedEditError.statusCode !== 401 && (
        <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />
      )}
    </form>
  );
}
