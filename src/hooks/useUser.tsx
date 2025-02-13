import { useQuery } from '@tanstack/react-query';

import { User, myInfo } from '@/service/user';
import { queryKeys } from '@/constants';
import { ServerError } from '@/types/common';

export default function useUser() {
  const {
    data: users,
    isError,
    error: usersError,
  } = useQuery<User, ServerError>({
    queryKey: [queryKeys.USER.INFO],
    queryFn: myInfo,
    gcTime: 60 * 59 * 1000,
    staleTime: 60 * 59 * 1000,
  });

  return {
    userInfo: users,
    isLoggedIn: users && !!users.userId && !isError,
    userError: usersError,
    isUserError: isError,
  };
}
