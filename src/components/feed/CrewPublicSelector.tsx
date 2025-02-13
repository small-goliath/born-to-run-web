'use client';

import { useModal } from '@/hooks/useModal';

import CommonCheckBox from '@/components/common/CommonCheckBox';
import LoginModal from '../signup/LoginModal';

type Props = {
  handleCheck: () => void;
  isCrewPublic: boolean;
  isLoggedIn?: boolean;
  isUserError?: boolean;
};

export default function CrewPublicSelector({ handleCheck, isCrewPublic, isLoggedIn, isUserError }: Props) {
  const loginModal = useModal();

  const handleCheckBox = () => {
    if (isUserError || !isLoggedIn) return loginModal.show();
    handleCheck();
  };

  return (
    <div className="flex items-center space-x-2 px-4 h-10">
      <CommonCheckBox type="sm" handleCheck={handleCheckBox} isChecked={isCrewPublic} />
      <span>크루만 공개 하기</span>
      <LoginModal isLoginModal={loginModal.isVisible} closeLogin={loginModal.hide} />
    </div>
  );
}
