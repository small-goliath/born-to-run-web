import { ChangeEvent, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { SignUpForm } from './SignUpForm';
import ErrorMessage from '../common/ErrorMessage';
import SignUpLabel from './SignUpLabel';
import CommonInput from '../common/CommonInput';

export default function SignUpInstaId() {
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpForm>();
  const validateInstaId = useCallback((value: string) => {
    const regex = /^[a-zA-Z0-9_.]*$/;
    return regex.test(value);
  }, []);

  const onChangeIdValid = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const isValid = validateInstaId(value);
      if (!isValid) {
        setError('instaId', {
          type: 'pattern',
          message: '아이디는 영어와 숫자, ‘_’, ‘.’ 조합으로만 가능해요',
        });
      } else {
        clearErrors('instaId');
      }
    },
    [clearErrors, setError, validateInstaId]
  );

  const instaIdErrorMessage = errors.instaId?.message;

  return (
    <div className="space-y-2">
      <SignUpLabel label="인스타그램 ID" />
      <CommonInput
        inputName="instaId"
        onChange={onChangeIdValid}
        placeholder="ID를 입력해주세요."
        hasInputError={!!instaIdErrorMessage}
      />
      {instaIdErrorMessage && <ErrorMessage text={instaIdErrorMessage} />}
    </div>
  );
}
