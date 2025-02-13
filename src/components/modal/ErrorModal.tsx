'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import TextButton from '../common/commonButton/TextButton';
import Modal from './Modal';
import ModalErrorIcon from '../icon/modalErrorIcon.svg';
import ModalSubTitle from './ModalSubTitle';
import ModalTitle from './ModalTitle';
import ModalWrapper from './ModalWrapper';

type Props = {
  isActive: boolean;
  isHome?: boolean;
  backHomeText?: string;
  title?: string;
  description?: string;
  closeText?: string;
  backUrl?: string;
  handleRetry?: () => void;
  closeModal: () => void;
};

export default function ErrorModal({
  isHome,
  isActive,
  backHomeText,
  title,
  description,
  closeText,
  backUrl,
  handleRetry,
  closeModal,
}: Props) {
  const router = useRouter();

  const closeErrorModal = useCallback(() => {
    if (backUrl) {
      router.replace(backUrl);
    }
    closeModal();
  }, [backUrl, closeModal, router]);

  const goHome = useCallback(() => {
    router.replace('/');
    closeModal();
  }, [closeModal, router]);

  const retry = useCallback(() => {
    handleRetry && handleRetry();
  }, [handleRetry]);

  return (
    <Modal isCenter isActive={isActive} onClose={closeErrorModal}>
      <ModalWrapper>
        <div className="flex justify-center items-center mt-4">
          <ModalErrorIcon />
        </div>

        <div className="space-y-2">
          <ModalTitle title={title || '잠시 후 다시 시도해 주세요'} />
          <ModalSubTitle
            subTitle={description || '일시적인 오류가 발생했습니다. 인터넷 연결이 원활한지 확인해보세요.'}
          />
        </div>

        {isHome && backHomeText ? (
          <div className="flex justify-center items-center">
            <TextButton type="back" onClick={goHome} text={backHomeText} />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <TextButton type="close" onClick={closeErrorModal} text={closeText || '닫기'} />
            {handleRetry && <TextButton type="enable" onClick={retry} text="다시 시도" />}
          </div>
        )}
      </ModalWrapper>
    </Modal>
  );
}
