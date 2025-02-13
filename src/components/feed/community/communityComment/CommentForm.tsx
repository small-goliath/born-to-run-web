import useUser from '@/hooks/useUser';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateComment } from '@/hooks/queries/community/useComment';
import { useModal } from '@/hooks/useModal';

import SolidButton from '../../../common/commonButton/SolidButton';
import ErrorModal from '../../../modal/ErrorModal';
import LoginModal from '../../../signup/LoginModal';

type CommentForm = {
  contents: string | null;
};

type Props = {
  feedId: number;
  parentCommentId?: number;
};

export default function CommentForm({ feedId, parentCommentId }: Props) {
  const { isLoggedIn } = useUser();
  const modal = useModal();
  const {
    mutate: commentMutate,
    isPending: createCommentLoading,
    isError: isCreateCommentError,
    error: createCommentError,
  } = useCreateComment(
    {
      feedId,
      parentCommentId,
    },
    {
      onError: () => {
        modal.show();
      },
    }
  );
  const { register, handleSubmit, watch, reset } = useForm<CommentForm>({
    defaultValues: {
      contents: null,
    },
  });

  const onSubmit = useCallback(
    (data: CommentForm) => {
      if (!feedId || !data.contents || data.contents === '' || createCommentLoading) return;
      commentMutate({
        contents: data.contents,
        ...(parentCommentId && { parentCommentId }),
      });
      reset();
    },
    [commentMutate, createCommentLoading, feedId, parentCommentId, reset]
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget instanceof SVGElement) {
      return;
    }
  };

  const isDisabled = (watch('contents') ?? '').length < 1;

  const handleLoginModal = useCallback(() => {
    if (!isLoggedIn) return modal.show();
  }, [isLoggedIn, modal]);

  const isLoginError = createCommentError?.statusCode === 401 || !isLoggedIn;
  const isExtraError = isCreateCommentError && createCommentError?.statusCode !== 401;

  return (
    <div className="border-t-[1px] border-t-secondary-N30 fixed py-2 px-4 bottom-0 left-0 right-0 w-sm md:w-md m-auto md:w-m bg-white">
      <form onClick={handleLoginModal} onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
        <div className="flex-grow relative">
          <input
            {...register('contents', {
              required: true,
            })}
            onBlur={handleBlur}
            type="text"
            placeholder="댓글 남기기"
            autoComplete="off"
            className="px-4 outline-none h-10 rounded-md border-[1px] border-secondary-N40 placeholder:text-secondary-N60 placeholder:text-body-md placeholder:leading-body-md placeholder:tracking-body-md text-black text-title-sm font-medium leading-title-sm tracking-title-sm focus:caret-primary-G400 focus:border-primary-G400 transition-all w-full pr-10"
          />
          {watch('contents') && (
            <svg
              onClick={() => reset()}
              tabIndex={-1}
              className="absolute right-4 top-0 bottom-0 m-auto cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 1C4.1 1 1 4.1 1 8C1 11.9 4.1 15 8 15C11.9 15 15 11.9 15 8C15 4.1 11.9 1 8 1ZM10.7 11.5L8 8.8L5.3 11.5L4.5 10.7L7.2 8L4.5 5.3L5.3 4.5L8 7.2L10.7 4.5L11.5 5.3L8.8 8L11.5 10.7L10.7 11.5Z"
                fill="#B7B7B7"
              />
            </svg>
          )}
        </div>
        <div>
          <SolidButton onClick={handleLoginModal} height="h-[2.5rem]" title="게시" disabled={isDisabled} />
        </div>
      </form>

      {isLoginError && <LoginModal isLoginModal={modal.isVisible} closeLogin={modal.hide} />}
      {isExtraError && <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />}
    </div>
  );
}
