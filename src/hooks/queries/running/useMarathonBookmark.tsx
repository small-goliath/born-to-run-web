import { queryClient } from '@/QueryProvider';
import { queryKeys } from '@/constants';
import { MarathonDetail, MarathonItem, deleteMarathonBookmark, marathonBookmark } from '@/service/marathon';
import { useToastStore } from '@/store/toastStore';
import { useMarathonFilterChipStore } from '@/store/useMarathonFilterChipsStore';
import { UseMutationCustomOption } from '@/types/common';
import { useMutation } from '@tanstack/react-query';

function useMarathonListBookmark(
  openModal?: () => void,
  mutationOptions?: UseMutationCustomOption<{ marathonId: number }>
) {
  const { locations, courses } = useMarathonFilterChipStore();
  const { addToast } = useToastStore();
  const stringLocations = locations.map((i) => String(i.title));
  const stringCourses = courses.map((i) => String(i.title));
  return useMutation({
    mutationFn: (marathonId: number) => marathonBookmark(marathonId),
    onMutate: (marathonId: number) => {
      const previousData = queryClient.getQueryData([queryKeys.MARATHON.GET_MARATHON_LIST]);
      queryClient.setQueryData(
        [queryKeys.MARATHON.GET_MARATHON_LIST, stringLocations, stringCourses],
        (oldData: MarathonItem[]) => {
          return oldData.map((item) => (item.marathonId === marathonId ? { ...item, isBookmarking: true } : item));
        }
      );
      return { previousData };
    },
    onSuccess: (data) => {
      if (data.marathonId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.MARATHON.GET_MARATHON_DETAIL, data.marathonId],
        });
      }
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_LIST, stringLocations, stringCourses],
      });
      addToast({
        message: '북마크 했어요',
        type: 'base',
      });
    },
    onError: (error) => {
      if (error.statusCode === 401 && openModal) {
        openModal();
      } else {
        addToast({
          message: '잠시 후 다시 시도해주세요',
          type: 'error',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_LIST, stringLocations, stringCourses],
      });
    },
    ...mutationOptions,
  });
}

function useMarathonListDeleteBookmark(
  openModal?: () => void,
  mutationOptions?: UseMutationCustomOption<{ marathonId: number }>
) {
  const { locations, courses } = useMarathonFilterChipStore();
  const { addToast } = useToastStore();
  const stringLocations = locations.map((i) => String(i.title));
  const stringCourses = courses.map((i) => String(i.title));
  return useMutation({
    mutationFn: (marathonId: number) => deleteMarathonBookmark(marathonId),
    onMutate: (marathonId: number) => {
      const previousData = queryClient.getQueryData([queryKeys.MARATHON.GET_MARATHON_LIST]);
      queryClient.setQueryData(
        [queryKeys.MARATHON.GET_MARATHON_LIST, stringLocations, stringCourses],
        (oldData: MarathonItem[]) => {
          return oldData.map((item) => (item.marathonId === marathonId ? { ...item, isBookmarking: false } : item));
        }
      );
      return { previousData };
    },
    onSuccess: (data) => {
      if (data.marathonId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.MARATHON.GET_MARATHON_DETAIL, data.marathonId],
        });
      }

      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_LIST, stringLocations, stringCourses],
      });
      addToast({
        message: '북마크를 취소했어요',
        type: 'base',
      });
    },
    onError: (error) => {
      if (openModal && error.statusCode === 401) {
        openModal();
      } else {
        addToast({
          message: '잠시 후 다시 시도해주세요',
          type: 'error',
        });
      }
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_LIST, stringLocations, stringCourses],
      });
    },
    ...mutationOptions,
  });
}

function useMarathonDetailBookmark(
  marathonId: number,
  mutationOptions?: UseMutationCustomOption<{ marathonId: number }>
) {
  const { addToast } = useToastStore();
  return useMutation({
    mutationFn: (marathonId: number) => marathonBookmark(marathonId),
    onMutate: (marathonId: number) => {
      queryClient.setQueryData([queryKeys.MARATHON.GET_MARATHON_DETAIL, marathonId], (prevData: MarathonDetail) => {
        if (prevData) {
          return {
            ...prevData,
            isBookmarking: true,
          };
        }
      });
    },
    onSuccess: (data) => {
      addToast({
        message: '북마크 했어요',
        type: 'base',
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_DETAIL, data.marathonId],
      });
    },
    onError: (_, v) => {
      addToast({
        message: '잠시 후 다시 시도해주세요',
        type: 'error',
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_DETAIL, marathonId],
      });
    },
    ...mutationOptions,
  });
}

function useMarathonDeleteDetailBookmark(
  marathonId: number,
  mutationOptions?: UseMutationCustomOption<{ marathonId: number }>
) {
  const { addToast } = useToastStore();
  return useMutation({
    mutationFn: (marathonId: number) => deleteMarathonBookmark(marathonId),
    onMutate: (marathonId: number) => {
      queryClient.setQueryData([queryKeys.MARATHON.GET_MARATHON_DETAIL, marathonId], (prevData: MarathonDetail) => {
        if (prevData) {
          return {
            ...prevData,
            isBookmarking: false,
          };
        }
      });
    },
    onSuccess: (data) => {
      addToast({
        message: '북마크를 취소했어요',
        type: 'base',
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_DETAIL, data.marathonId],
      });
    },
    onError: () => {
      addToast({
        message: '잠시 후 다시 시도해주세요',
        type: 'error',
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARATHON.GET_MARATHON_DETAIL, marathonId],
      });
    },
    ...mutationOptions,
  });
}

export {
  useMarathonDetailBookmark,
  useMarathonDeleteDetailBookmark,
  useMarathonListBookmark,
  useMarathonListDeleteBookmark,
};
