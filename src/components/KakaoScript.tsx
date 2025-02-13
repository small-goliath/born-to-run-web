'use client';

import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any;
  }
}

export default function KakaoScript() {
  const router = useRouter();

  function kakaoInit() {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    console.log('kakao loaded', window.Kakao.isInitialized());
  }

  const onError = (error: any) => {
    console.error('script error', error);
    // 추후 SDK 에러 핸들링 추가
    router.replace('/');
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
      integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
      crossOrigin="anonymous"
      onLoad={kakaoInit}
      onError={onError}
    ></Script>
  );
}
