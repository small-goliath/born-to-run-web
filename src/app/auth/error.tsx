'use client';

import HttpError from '@/service/httpError';
import Link from 'next/link';
import { useEffect } from 'react';

type Props = { error: Error; reset?: () => void };

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error('kakao error page', error);
  }, [error]);

  const statusCode = error instanceof HttpError ? error.getStatusCode() : undefined;

  return (
    <div className="absolute left-0 right-0 top-0 h-screen flex justify-center items-center bg-gray-800 text-neutral-100">
      <div className="h-[31rem] flex flex-col justify-center items-center px-2">
        <p className="text-lg sm:text-2xl text-center">인증 또는 네트워크 통신 문제가 발생하였습니다.</p>
        <p className="text-sm mt-6  text-neutral-400">code : {statusCode}</p>
        <p className="text-sm mt-2 mb-10 text-neutral-400">error : {error.message || '장애가 발생하였습니다.'}</p>

        <Link href="/">
          <button className="bg-gray-900 text-neutral-100 sm:px-6 sm:py-3 p-3 text-base  shadow-xl sm:text-lg rounded-xl hover:text-neutral-950 hover:bg-gray-300 transition-all">
            되돌아 가기
          </button>
        </Link>
      </div>
    </div>
  );
}
