import { queryKeys } from '@/constants';
import {
  MarathonDetail,
  MarathonItem,
  MarathonListResponse,
  getMarathonDetail,
  getMarathonList,
} from '@/service/marathon';
import { UseQueryCustomOption } from '@/types/common';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

function useGetMarathonList(
  { locations, courses }: { locations?: string[]; courses?: string[] },
  queryOptions?: UseQueryCustomOption<MarathonListResponse>
) {
  return useQuery({
    queryKey: [queryKeys.MARATHON.GET_MARATHON_LIST, locations, courses],
    queryFn: () =>
      getMarathonList({
        locations,
        courses,
      }),
    staleTime: 1000 * 60 * 57,
    gcTime: 1000 * 60 * 57,
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
}

function useGetMarathonDetail(marathonId: number, queryOptions?: UseQueryCustomOption<MarathonDetail>) {
  return useQuery({
    queryKey: [queryKeys.MARATHON.GET_MARATHON_DETAIL, marathonId],
    queryFn: () => getMarathonDetail(marathonId),
    staleTime: 1000 * 60 * 57,
    gcTime: 1000 * 60 * 57,
    ...queryOptions,
  });
}

export { useGetMarathonList, useGetMarathonDetail };
