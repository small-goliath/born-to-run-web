import { handleNetworkError } from '@/utils/handleNetworkError';
import axios, { AxiosError } from 'axios';
import { api } from './httpClient';
import HttpError from './httpError';

export const kakaoAuth = async () => {
  const result = await (await api.get('/users/kakao/auth-code')).data;
  return result;
};

type SignIn = {
  isMember: boolean;
};

export const signIn = async (kakaoAuthCode: string | null) => {
  if (!kakaoAuthCode || kakaoAuthCode === '') return;

  try {
    const result = await (
      await axios.post<Promise<SignIn>>(
        '/api/v1/users/sign-in',
        {
          kakaoAuthCode,
        },
        {
          withCredentials: true,
        }
      )
    ).data;

    return result;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new HttpError(response?.status, response?.statusText);
    }
    throw new Error('네트워크 통신 에러 발생');
  }
};

type Refresh = {
  isSuccess: boolean;
  jwt?: string;
  error?: string;
};

export const refreshToken = async (token: string) => {
  try {
    const result = await (
      await axios.get<Promise<Refresh>>('/api/refresh', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
    console.log('service auth refreshToken result', result);
    return result;
  } catch (error) {
    return handleNetworkError(error);
  }
};

type SignUpData = {
  kakaoAuth?: {
    code: string;
  };
  userName: string;
  crewId: number;
  instagramId?: string;
};

export const signUp = async ({ crewId, instagramId, userName }: SignUpData) => {
  try {
    const result = await (
      await axios.put<Promise<{ token: string }>>(
        '/api/v1/users/sign-up',
        {
          userName,
          crewId,
          ...(instagramId && { instagramId }),
        },
        {
          withCredentials: true,
        }
      )
    ).data;
    return result;
  } catch (error) {
    return handleNetworkError(error);
  }
};

type SignOut = {
  time: string;
  data: {
    jwt: string;
    isMember: boolean;
  };
  errorCode: number;
  msg: string;
};

export const signOut = async () => {
  return await (
    await api.post<Promise<SignOut>>('/auth/signout', {})
  ).data;
};

//임시 회원탈퇴 - 나중에 제거
export const withDrawal = async () => {
  return await (
    await api.delete('/users')
  ).data;
};

type Crew = {
  id: string;
  crewName: string;
  crewImageUrl?: string;
  crewSnsUrl?: string;
};

type Crews = {
  crewDetails: Crew[];
};

export const crews = async () => {
  const result = await (await axios.get<Promise<Crews>>('/api/v1/crews')).data;
  return result;
};

export type { Crew, Crews, SignOut, SignUpData };

