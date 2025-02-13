'use client';

import { ChangeEvent, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import SignUpLabel from './SignUpLabel';
import { SignUpForm } from './SignUpForm';
import ErrorMessage from '../common/ErrorMessage';
import CommonInput from '../common/CommonInput';

export default function SignUpUserName() {
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpForm>();
  const onChangeUsernameValid = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const notKorean = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
      const value = e.target.value.replace(notKorean, '');
      e.target.value = value;

      if (value.length === 1 || value === '') {
        setError('userName', {
          type: 'minLength',
          message: '두글자 이상 입력해주세요.',
        });
      } else {
        clearErrors('userName');
      }
    },
    [clearErrors, setError]
  );

  const userNameErrorMessage = errors.userName?.message;

  return (
    <div className="space-y-2">
      <SignUpLabel isRequire label="이름" />
      <CommonInput
        onChange={onChangeUsernameValid}
        placeholder="실명을 입력해주세요"
        inputName="userName"
        isRequire
        hasInputError={!!userNameErrorMessage || !!errors.userName}
        minLength={{
          value: 2,
          message: '두글자 이상 입력해주세요',
        }}
      />
      {userNameErrorMessage && <ErrorMessage text={userNameErrorMessage} />}
    </div>
  );
}
