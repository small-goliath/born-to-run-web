import { ACCESS_TOKEN } from '@/service/httpClient';
import { getCookie } from 'cookies-next';
import { create } from 'zustand';

type LogInState = {
  authCode: string | null;
  isMember: boolean | null;
  token: string | null;
  isFirstLoggedIn: boolean | null;
  isFirstSignUp: boolean | null;
};

export type LoginInitialState = {
  loginState: LogInState;
  setLoginState: (loginState: Partial<LogInState>) => void;
  setTokenState: (token: string) => void;
};

export const useLoginStateStore = create<LoginInitialState>((set) => ({
  loginState: {
    authCode: null,
    isMember: null,
    token: getCookie(ACCESS_TOKEN) || null,
    isFirstLoggedIn: null,
    isFirstSignUp: null,
  },
  setLoginState: (loginState: Partial<LogInState>) =>
    set((state) => ({ ...state, loginState: { ...state.loginState, ...loginState } })),
  setTokenState: (token) => set((state) => ({ ...state, loginState: { ...state.loginState, token } })),
}));
