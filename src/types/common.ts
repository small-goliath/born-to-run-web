import { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

type ServerError = { statusCode: number; errorMessage: string };

type UseMutationCustomOption<TData = unknown, TVariants = unknown> = Omit<
  UseMutationOptions<TData, ServerError, TVariants, unknown>,
  'mutationFn'
>;

type UseQueryCustomOption<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ServerError, TData, QueryKey>,
  'queryKey'
>;

type SelectItem = {
  title: string;
  key: number | string;
};

export type { ServerError, UseMutationCustomOption, UseQueryCustomOption, SelectItem };
