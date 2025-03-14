'use client';

import useAuth from '@/hooks/queries/useAuth';
import { useModal } from '@/hooks/useModal';
import { ACCESS_TOKEN } from '@/service/httpClient';
import { useLoginStateStore } from '@/store/useLoginStateStore';
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import SolidButton from '@/components/common/commonButton/SolidButton';
import ErrorModal from '@/components/modal/ErrorModal';
import SignUpCrewName from './SignUpCrewName';
import SignUpInstaId from './SignUpInstaId';
import SignUpUserName from './SignUpUserName';

export type SignUpForm = {
  userName: string;
  crew: string;
  instaId?: string;
};

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const isMember = searchParams.get('isMember');
  const accessToken = searchParams.get('accessToken');
  const router = useRouter();
  const modal = useModal();
  const formMethods = useForm<SignUpForm>();
  const {
    getCrewListQuery: { data: crewList, isError: isCrewListError },
  } = useAuth();
  const onSignUpError = () => {
    modal.show();
  };
  const { signUp } = useAuth(null, { onError: onSignUpError });
  const { loginState } = useLoginStateStore();
  useEffect(() => {
    if (isCrewListError) modal.show();
  }, [isCrewListError, modal]);

  const onSubmit = useCallback(
    (data: SignUpForm) => {
      const { crew, userName, instaId } = data;
      const crewId = crewList?.crewDetails.find((item) => item.crewName === crew)?.id;
      if (!crewId || !userName) return;

      signUp.mutate({
        crewId: Number(crewId),
        userName,
        ...(instaId && { instagramId: instaId }),
      });
    },
    [crewList?.crewDetails, signUp]
  );


  setCookie(ACCESS_TOKEN, accessToken);
  if (isMember === 'true') {
    console.log('signup form exit!');
    router.replace('/');
  } else {
    console.log('signup form');
    
    const formErrors = formMethods.formState.errors;
    const isCrewNameError =
      !!formErrors.crew?.type || formMethods.getValues('crew') === '' || !formMethods.getValues('crew');
    const isUserNameError = !!formErrors.userName?.type || !formMethods.getValues('userName');
    const isIstaError = !!formErrors.instaId?.type;

    const buttonDisabled = isCrewNameError || isUserNameError || isIstaError;

    return (
      <div>
        {isCrewListError && (
          <ErrorModal
            isActive={modal.isVisible}
            isHome
            backHomeText="네트워크 장애가 발생하였습니다."
            closeModal={modal.hide}
          />
        )}
        {signUp.isError ? (
          <ErrorModal isHome isActive={modal.isVisible} backHomeText="회원가입 실패하였습니다." closeModal={modal.hide} />
        ) : (
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6 ">
              <SignUpUserName />
              <SignUpCrewName crewList={crewList} />
              <SignUpInstaId />

              <div className="absolute bottom-4 m-auto left-0 right-0">
                <SolidButton
                  title="가입 완료"
                  type="submit"
                  disabled={buttonDisabled}
                  height={'h-[3.5rem]'}
                  isLoading={signUp.isPending}
                />
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    );
  }
}
