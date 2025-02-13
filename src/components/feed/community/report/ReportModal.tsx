'use client';

import TextButton from '../../../common/commonButton/TextButton';
import Modal from '../../../modal/Modal';
import ModalSubTitle from '../../../modal/ModalSubTitle';
import ModalTitle from '../../../modal/ModalTitle';
import ModalWrapper from '../../../modal/ModalWrapper';

type Props = {
  isActiveReportModal: boolean;
  closeReportModal: () => void;
};

export default function ReportModal({ closeReportModal, isActiveReportModal }: Props) {
  return (
    <Modal isActive={isActiveReportModal} isCenter>
      <ModalWrapper>
        <ModalTitle title="신고 완료" />
        <ModalSubTitle subTitle="신고가 접수되었습니다. 빠르게 확인 후 조치하도록 하겠습니다. 감사합니다." />

        <TextButton type="close" onClick={closeReportModal} text="확인" />
      </ModalWrapper>
    </Modal>
  );
}
