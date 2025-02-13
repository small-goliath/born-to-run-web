import HttpError from '@/service/httpError';
import { AxiosError } from 'axios';

const handleNetworkError = (error: any) => {
  if (error instanceof AxiosError) {
    const { response } = error;
    throw new HttpError(response?.status, response?.statusText).errorMessage;
  }
  throw new Error('네트워크 통신 에러 발생');
};

export { handleNetworkError };
