'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  errorMessage: string;
};

export default function AuthError({ errorMessage }: Props) {
  const router = useRouter();

  const handleReLogin = useCallback(() => {
    console.log('Auth Error');
    router.replace('/');
  }, [router]);
  return (
    <div className="absolute w-full z-10">
      <div className="bg-amber-600 rounded-lg px-10 shadow-xl w-96 h-96 m-auto">
        <p className="text-center text-white text-lg pt-[50%]">{errorMessage}</p>
        <button
          onClick={handleReLogin}
          className="text-center w-full mt-10 p-2 bg-yellow-300 rounded-lg text-neutral-800"
        >
          재 인증하기
        </button>
      </div>
    </div>
  );
}
