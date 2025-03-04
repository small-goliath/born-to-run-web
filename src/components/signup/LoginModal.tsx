'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import TextButton from '../common/commonButton/TextButton';
import Modal from '../modal/Modal';
import ModalSubTitle from '../modal/ModalSubTitle';
import ModalTitle from '../modal/ModalTitle';
import ModalWrapper from '../modal/ModalWrapper';
import LoginKakaoModal from './LoginKakaoModal';

type Props = {
  isLoginModal: boolean;
  closeLogin: () => void;
  reFetchData?: () => void;
  backUrl?: string;
};

export default function LoginModal({ closeLogin, isLoginModal, reFetchData, backUrl }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const [isKakao, setIsKakao] = useState(false);
  const openKakao = useCallback((event?: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    setIsKakao(true);
  }, []);

  const handleCloseLogin = useCallback(() => {
    setIsKakao(false);
    if (reFetchData) {
      reFetchData();
      closeLogin();
      return;
    }
    if (backUrl) {
      router.push(backUrl);
      closeLogin();
      return;
    }
    router.push(pathName);
    closeLogin();
  }, [backUrl, closeLogin, pathName, reFetchData, router]);

  return (
    <>
      <Modal isActive={isLoginModal} isCenter onClose={handleCloseLogin}>
        {!isKakao && (
          <ModalWrapper>
            <div className="space-y-4">
              <div className="space-y-2">
                <ModalTitle title="로그인이 필요해요." />
                <ModalSubTitle subTitle="런에이서 회원이 되면 러닝 모임 관리와 소통이 훨씬 간편해져요!" />
              </div>

              <div className="flex items-center justify-center gap-2">
                <TextButton type="close" onClick={handleCloseLogin} text="닫기" />
                <TextButton type="enable" onClick={openKakao} text="시작하기" />
              </div>
            </div>
          </ModalWrapper>
        )}
        {isKakao && <LoginKakaoModal closeModal={handleCloseLogin} />}
      </Modal>
    </>
  );
}
