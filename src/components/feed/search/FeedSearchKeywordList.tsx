'use client';

import { useCallback, useEffect } from 'react';
import { useDeleteSearchKeyword, useDeleteSearchKeywordAll, useGetSearchList } from '@/hooks/queries/useSearch';
import { useModal } from '@/hooks/useModal';
import useUser from '@/hooks/useUser';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import LoginModal from '@/components/signup/LoginModal';
import ErrorModal from '@/components/modal/ErrorModal';
import FeedSearchItem from './FeedSearchItem';

export default function FeedSearchKeywordList() {
  const modal = useModal();
  const { isLoggedIn } = useUser();

  const {
    data: keywordList,
    isLoading,
    error: keywordListError,
    isError: isKeywordListError,
  } = useGetSearchList({
    enabled: isLoggedIn,
  });

  const {
    mutate: keywordDeleteMutate,
    isError: isKeywordDeleteError,
    isPending: isKeywordDeleteLoading,
    error: keywordDeleteError,
  } = useDeleteSearchKeyword({
    onError: () => {
      modal.show();
    },
  });

  const deleteKeyword = useCallback(
    (keyword: string) => {
      if (!keyword || isKeywordDeleteLoading) return;
      keywordDeleteMutate(keyword);
    },
    [isKeywordDeleteLoading, keywordDeleteMutate]
  );

  const {
    mutate: keywordDeleteAllMutate,
    isError: isKeywordDeleteAll,
    isPending: isKeywordDeleteAllLoading,
    error: keywordDeleteAllError,
  } = useDeleteSearchKeywordAll({
    onError: () => {
      modal.show();
    },
  });

  const isKeywordErrors = isKeywordListError || isKeywordDeleteError || isKeywordDeleteAll;
  const isKeywordLoginError =
    keywordDeleteAllError?.statusCode === 401 ||
    keywordDeleteError?.statusCode === 401 ||
    keywordListError?.statusCode === 401;

  useEffect(() => {
    if (isKeywordLoginError) modal.show();
  }, [isKeywordLoginError, modal]);

  const deleteKeywordAll = useCallback(() => {
    if (isKeywordDeleteAll) return;

    keywordDeleteAllMutate();
  }, [isKeywordDeleteAll, keywordDeleteAllMutate]);

  return (
    <div>
      {isLoading && (
        <div className="w-full flex justify-center pt-14">
          <LoadingSpinner />
        </div>
      )}
      {keywordList && keywordList?.searchKeywords?.length > 0 ? (
        <div>
          <div className="h-8 text-secondary-N200 font-medium leading-title-sm tracking-title-sm flex items-center justify-between text-title-sm">
            <span>최근 검색어</span>
            <span onClick={deleteKeywordAll} className="cursor-pointer">
              전체 삭제
            </span>
          </div>

          <ul className="">
            {keywordList?.searchKeywords?.map((item, index) => (
              <FeedSearchItem key={item} keyword={item} deleteKeyword={deleteKeyword} />
            ))}
          </ul>
        </div>
      ) : null}

      {isKeywordLoginError && <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />}
      {isKeywordErrors && <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />}
    </div>
  );
}
