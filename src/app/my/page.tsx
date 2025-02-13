'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Toast from '@/components/common/Toast';

import { withDrawal } from '@/service/auth';
import { ACCESS_TOKEN } from '@/service/httpClient';
import { useToastStore } from '@/store/toastStore';
import { deleteCookie } from 'cookies-next';

export default function MyPage() {
  const router = useRouter();
  const { addToast } = useToastStore();
  const [isActive, setIsActive] = useState(true);

  const handleWithDrawal = async () => {
    const res = await withDrawal().then((data) => {
      deleteCookie(ACCESS_TOKEN);
      router.replace('/');
    });
    return res;
  };

  const handleAddToast = () => {
    const id = Date.now();
    addToast({ message: `임시 테스트 ${id}`, type: 'base' });
  };

  const handleActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <>
      <h1>MyPage</h1>
      {/* 임시 회원버튼 */}
      <div className="space-y-10">
        <button onClick={handleWithDrawal} className="px-14 py-4 border-2 border-black">
          임시 회원탈퇴
        </button>
        <button onClick={handleAddToast} className="px-14 py-4 border-2 border-black">
          테스트 토어스트 추가
        </button>

        <button onClick={handleActive} className="px-14 py-4 border-2 border-black">
          테스트 토어스트 상태 제거
        </button>
      </div>

      {isActive && <Toast isShowing />}
    </>
  );
}
