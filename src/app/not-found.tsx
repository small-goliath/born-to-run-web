'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 text-white overflow-hidden absolute left-0 top-0 bottom-0 right-0">
      <div className="px-4 mb-6 flex flex-col justify-center items-center py-10">
        <h2 className="text-3xl font-bold">Not Found</h2>
        <p className="text-xl mt-5 mb-18 text-neutral-300">페이지를 찾을 수 없습니다.</p>
      </div>
      <Link href="/">
        <button className="bg-gray-900 text-neutral-100 sm:px-6 sm:py-3 p-3 text-base  shadow-xl sm:text-lg rounded-xl hover:text-neutral-950 hover:bg-gray-300 transition-all">
          홈으로 되돌아 가기
        </button>
      </Link>
    </div>
  );
}
