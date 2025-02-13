'use client';

import { usePathname, useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { useDeleteCommunity } from '@/hooks/queries/community/useCommunity';
import { useCallback } from 'react';
import { useModal } from '@/hooks/useModal';
import { useCommunityMoreView } from '@/hooks/useCommunityMoreView';

import CommunityMoreSetting from '../CommunityMoreSetting';
import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';
import DeleteModal from '../../DeleteModal';

type Props = {
  feedWriter?: string;
  feedContent?: string;
};

export default function DetailMoreView({ feedWriter, feedContent }: Props) {
  const pathName = usePathname();
  const feedId = Number(pathName.split('/').pop());
  const modal = useModal();
  const deleteModal = useModal();
  const { isLoggedIn, userInfo } = useUser();

  const router = useRouter();
  const { mutate: feedDeleteMutate, error: deleteError } = useDeleteCommunity(feedId);

  const onEdit = () => {
    router.push(`/community/edit/${feedId}`);
  };

  const onReport = () => {
    router.push(`/report/?type=feed&feedId=${feedId}`);
  };

  const onDelete = useCallback(() => {
    feedDeleteMutate(feedId);
  }, [feedDeleteMutate, feedId]);

  const isMyFeed = isLoggedIn && feedWriter === userInfo?.userName;

  const { handlePopUpItem } = useCommunityMoreView({
    onEdit,
    onReport,
    onDeleteModal: deleteModal.show,
    copyText: feedContent,
  });

  return (
    <>
      <CommunityMoreSetting isMyMoreView={isMyFeed} moreIconType="circle" handlePopUpItem={handlePopUpItem} />

      <DeleteModal
        onCloseModal={deleteModal.hide}
        showDeleteModal={deleteModal.isVisible}
        onDelete={onDelete}
        deleteType="게시물"
      />

      {deleteError &&
        (deleteError.statusCode === 401 ? (
          <LoginModal isLoginModal={modal.isVisible} closeLogin={modal.hide} />
        ) : (
          <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />
        ))}
    </>
  );
}
