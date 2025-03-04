'use client';

import { useCreateCommunityFeed } from '@/hooks/queries/community/useCommunity';
import { useModal } from '@/hooks/useModal';
import useUser from '@/hooks/useUser';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import SolidButton from '@/components/common/commonButton/SolidButton';
import CommonDivider from '@/components/common/CommonDivider';
import PageHeader from '@/components/header/PageHeader';
import ErrorModal from '@/components/modal/ErrorModal';
import LoginModal from '@/components/signup/LoginModal';
import { HOME_HEADER_TABS, HeaderTab } from '@/data';
import { CrewPublic } from '@/service/community';
import CommunityTypeSelector from '../CommunityTypeSelector';
import CrewPublicSelector from '../CrewPublicSelector';
import PhotoSelector, { UploadFileState } from '../PhotoSelector';
import CreateContent from './CreateContent';

export default function CreateForm() {
  const { isLoggedIn, isUserError } = useUser();
  const modal = useModal();
  const writeTypeParam = useSearchParams().get('type') as HeaderTab['type'] | null;
  const type = HOME_HEADER_TABS.find((tab) => tab.type === writeTypeParam);
  const router = useRouter();

  const [accessLevel, setAccessLevel] = useState<CrewPublic>('ALL');
  const [isCrewPublic, setIsCrewPublic] = useState(false);
  const [feedCategory, setFeedCategory] = useState<HeaderTab | undefined>(type);
  const [contents, setContents] = useState<string>('');
  const [uploadFileState, setUploadFileState] = useState<UploadFileState>({
    loading: false,
    images: [],
    isError: false,
  });

  const {
    mutate: createFeedMutate,
    isError: isCreateFeedError,
    isPending: isCreateFeedLoading,
    error: createFeedError,
  } = useCreateCommunityFeed({
    onError: () => {
      modal.show();
    },
  });

  const handleUploadFileState = (state: UploadFileState) => {
    setUploadFileState(state);
  };

  const handleCheck = useCallback(() => {
    setIsCrewPublic((prev) => !prev);
    setAccessLevel((prev) => (prev === 'ALL' ? 'IN_CREW' : 'ALL'));
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const onSubmit = () => {
    if (!isLoggedIn) return modal.show();
    if (!feedCategory?.type || uploadFileState.loading) return;

    createFeedMutate({
      accessLevel,
      category: feedCategory.type,
      contents,
      imageIds: uploadFileState.images.length > 0 ? uploadFileState.images.map((image) => image.imageId) : [],
    });
  };

  const disabledCreateButton =
    contents === '' || contents.length < 1 || !feedCategory || !feedCategory.type || uploadFileState.loading;

  const isLoginError = !isLoggedIn || isUserError || createFeedError?.statusCode === 401;
  const isExternalError = isCreateFeedError && (createFeedError.statusCode !== 401 || uploadFileState.isError);

  useEffect(() => {
    if (writeTypeParam === null) router.replace('/');
  }, [router, writeTypeParam]);

  return (
    <form>
      <PageHeader backUrl="/" title="글쓰기" isShadow closeIconType="close">
        <SolidButton
          type="button"
          onClick={onSubmit}
          title="게시"
          height="h-[2.5rem]"
          disabled={disabledCreateButton}
          isLoading={isCreateFeedLoading}
        />
      </PageHeader>
      <div className="mt-2 w-full flex justify-between">
        <CommunityTypeSelector feedCategory={feedCategory} setFeedCategory={setFeedCategory} />
        <CrewPublicSelector handleCheck={handleCheck} isCrewPublic={isCrewPublic} isLoggedIn={isLoggedIn} isUserError={isUserError}/>
      </div>

      <div className="my-2">
        <CommonDivider type="sm" />
      </div>

      <PhotoSelector onUploadFileState={handleUploadFileState} initialFiles={uploadFileState.images} />

      <div className="my-2">
        <CommonDivider type="sm" />
      </div>

      <CreateContent
        onChange={handleChange}
        value={contents}
        placeholder="러닝 후기를 공유해 보세요!"
        maxLength={2000}
      />

      {isExternalError && <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />}
      {isLoginError && <LoginModal isLoginModal={modal.isVisible} closeLogin={modal.hide} />}
    </form>
  );
}
