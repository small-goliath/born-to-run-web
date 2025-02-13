'use client';

import { useCallback } from 'react';
import TextButton from '../common/commonButton/TextButton';
import Modal from '../modal/Modal';
import ModalSubTitle from '../modal/ModalSubTitle';
import ModalTitle from '../modal/ModalTitle';
import ModalWrapper from '../modal/ModalWrapper';

type Props = {
  showDeleteModal: boolean;
  onCloseModal: () => void;
  onDelete?: () => void;
  deleteType: string;
};

export default function DeleteModal({ onCloseModal, showDeleteModal, onDelete, deleteType }: Props) {
  const handleDelete = useCallback(() => {
    onCloseModal();
    onDelete && onDelete();
  }, [onCloseModal, onDelete]);
  return (
    <>
      <Modal isActive={showDeleteModal} isCenter>
        <ModalWrapper>
          <div>
            <ModalTitle title={`${deleteType}을 삭제하시겠어요?`} />
            <ModalSubTitle subTitle="삭제하면 되돌릴 수 없어요. 정말로 삭제하시겠어요?" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <TextButton type="close" text="취소" onClick={onCloseModal} />
            <TextButton type="em" text="삭제" onClick={handleDelete} />
          </div>
        </ModalWrapper>
      </Modal>
    </>
  );
}
