/**
 * 카카오 인가코드와 로그인 처리하는 페이지
 */

import AuthKakao from '@/components/AuthKakao';
import { Suspense } from 'react';

export default function AuthKakaoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthKakao />
    </Suspense>
  );
}
