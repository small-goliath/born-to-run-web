'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { useCreateSearchKeyword } from '@/hooks/queries/useSearch';

import CommonInput from '@/components/common/CommonInput';
import OutlineButton from '@/components/common/commonButton/OutlineButton';
import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';
import { SearchKeywordAll } from '@/service/search';
import { queryKeys } from '@/constants';
import { useModal } from '@/hooks/useModal';

export type SearchForm = {
  keyword: string;
};

export default function FeedSearchForm() {
  const { handleSubmit, watch } = useFormContext<SearchForm>();
  const modal = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const isDisabledButton = !watch('keyword') || watch('keyword')?.length === 0;
  const keywordList = queryClient.getQueryData<SearchKeywordAll>([queryKeys.COMMUNITY.SEARCH.ALL]);

  const {
    mutate: keywordPost,
    isError: isKeywordPostError,
    error: keywordPostError,
    isPending: isKeywordPostLoading,
  } = useCreateSearchKeyword({
    onError: () => {
      modal.show();
    },
  });

  const onSubmit = ({ keyword }: SearchForm) => {
    const isIncludedKeyword = keywordList?.searchKeywords.includes(keyword);
    if (!keyword || isKeywordPostLoading) return;
    if (!isIncludedKeyword) {
      keywordPost(keyword);
    }

    router.push(`/community/search?keyword=${keyword}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center py-4 gap-2">
        <div className="flex-grow">
          <CommonInput inputName="keyword" placeholder="검색어를 입력해주세요" height="h-[2.5rem]" />
        </div>
        <div>
          <OutlineButton text="검색" type="active" height="h-[2.5rem]" disabled={isDisabledButton} />
        </div>
      </div>

      {isKeywordPostError && keywordPostError.statusCode === 401 && (
        <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
      )}

      {isKeywordPostError && keywordPostError.statusCode !== 401 && (
        <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />
      )}
    </form>
  );
}
