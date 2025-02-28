import { useToastStore } from '@/store/toastStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLoginStateStore } from '@/store/useLoginStateStore';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

import { UseMutationCustomOption, UseQueryCustomOption } from '@/types/common';
import { Crews, SignUpData, crews, signIn, signUp } from '@/service/auth';
import { ACCESS_TOKEN } from '@/service/httpClient';
import { SignIn } from '@/service/auth';

function useKakaoLogin(mutationOptions?: UseMutationCustomOption, authCode?: string | null, data?: SignIn | null) {
  const router = useRouter();
  const { setLoginState } = useLoginStateStore();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (code: string) => signIn(code),
    onSuccess: () => {
      if (data) {
        setLoginState({ authCode });
        if (data.isMember) {
          console.log('data.isMember ', data.isMember);
          addToast({ message: '로그인하셨습니다.', type: 'base' });
          setLoginState({ isMember: data.isMember, isFirstLoggedIn: true });
          router.replace('/');
        } else {
          router.replace('/auth/signup');
        }
      }
    },
    ...mutationOptions,
  });
}

function useSignUp(mutationOptions?: UseMutationCustomOption) {
  const router = useRouter();
  const { setLoginState } = useLoginStateStore();
  const { addToast } = useToastStore();
  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: (data) => {
      if (data) {
        addToast({ message: '환영합니다! 가입을 완료했습니다!', type: 'base' });
        setCookie(ACCESS_TOKEN, data.token);
        setLoginState({
          isMember: true,
          token: data.token,
          isFirstSignUp: true,
        });
        router.replace('/');
      }
    },
    ...mutationOptions,
  });
}

function useGetCrewNameList(queryOptions?: UseQueryCustomOption<Crews>) {
  return useQuery({
    queryKey: ['crews'],
    queryFn: crews,
    retry: 0,
    ...queryOptions,
  });
}

function useAuth(authCode?: string | null, mutationOptions?: UseMutationCustomOption) {
  return {
    kakaoLogin: useKakaoLogin(mutationOptions, authCode),
    signUp: useSignUp(mutationOptions),
    getCrewListQuery: useGetCrewNameList(),
  };
}

export default useAuth;
