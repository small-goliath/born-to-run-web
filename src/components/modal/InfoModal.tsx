'use client';

import { motion, AnimatePresence } from 'framer-motion';

import ModalSubTitle from './ModalSubTitle';
import ModalTitle from './ModalTitle';
import ModalWrapper from './ModalWrapper';
import Modal from './Modal';
import TextButton from '../common/commonButton/TextButton';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  isActiveModal: boolean;
  description?: string;
  title?: string;
  isHome?: boolean;
  backHomeText?: string;
  closeText?: string;
  closeModal: () => void;
};

export default function InfoModal({
  isActiveModal,
  description,
  title,
  backHomeText,
  isHome,
  closeText,
  closeModal,
}: Props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(isActiveModal);

  const goHome = useCallback(() => {
    router.replace('/');
    setIsActive(false);
  }, [router]);

  return (
    <AnimatePresence>
      <Modal isCenter isActive={isActive}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            ease: 'easeOut',
            duration: 0.2,
          }}
          className="w-full h-full px-6 max-w-sm"
        >
          <ModalWrapper>
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
                <TextButton type="close" onClick={closeModal} text={closeText || '닫기'} />
              </div>
            )}
          </ModalWrapper>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
}
