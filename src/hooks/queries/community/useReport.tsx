import { UserReportArgs, userReport } from '@/service/user';
import { UseMutationCustomOption } from '@/types/common';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type ReportIds = {
  reportFeedId: number;
  reportCommentId: number;
  reportCommentType: string | null;
};

function useReport(reportIds: ReportIds, mutationOptions?: UseMutationCustomOption) {
  const router = useRouter();
  const { reportCommentId, reportFeedId, reportCommentType } = reportIds;
  return useMutation({
    mutationKey: ['userReport'],
    mutationFn: (data: UserReportArgs) => userReport(data),
    onSuccess: () => {
      if (reportCommentType === 'detail') {
        router.replace(`/community/detail/${reportFeedId}/comment/${reportCommentId}?reportState=success`);
        return;
      } else {
        router.replace(`/community/detail/${reportFeedId}?reportState=success`);
        return;
      }
    },

    ...mutationOptions,
  });
}

export { useReport };
