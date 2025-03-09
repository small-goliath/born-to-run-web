import SignUp from '@/components/signup/SignUp';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </Suspense>
    </main>
  );
}