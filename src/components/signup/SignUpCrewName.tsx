'use client';

import { useModal } from '@/hooks/useModal';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import CommonInput from '../common/CommonInput';
import ErrorMessage from '../common/ErrorMessage';
import CrewSelectorModal from '../modal/CrewSelectorModal';
import SignUpLabel from './SignUpLabel';

import { Crew } from '@/service/auth';
import { SelectItem } from '@/types/common';
import { SignUpForm } from './SignUpForm';

type Props = {
  crewList?: {
    crewDetails: Crew[];
  };
  selectorCheckType?: 'checkBox' | 'radioBox';
};

export default function SignUpCrewName({ crewList }: Props) {
  const {
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
    setError,
  } = useFormContext<SignUpForm>();
  const [selectedCrew, setSelectedCrew] = useState<SelectItem>();
  const [isComplete, setIsComplete] = useState(false);
  const modal = useModal();

  const handleSelectCrew = useCallback((crew: SelectItem) => {
    setSelectedCrew(crew);
  }, []);

  const handleSelectionComplete = useCallback(() => {
    if (!selectedCrew) return;
    setIsComplete(true);
    setValue('crew', selectedCrew.title);
    clearErrors('crew');
    modal.hide();
  }, [clearErrors, selectedCrew, modal, setValue]);

  const crewNameErrorMessage = errors.crew?.message;
  const selectedCrewNameComplete = !errors.crew && !!getValues('crew') && isComplete;

  const onClose = useCallback(() => {
    const hasCrewName = getValues('crew');
    if (!hasCrewName) {
      setSelectedCrew(undefined);
      setError('crew', {
        type: 'required',
        message: '크루 이름을 선택완료해주세요.',
      });
    }
    modal.hide();
  }, [getValues, modal, setError]);

  return (
    <div className="space-y-2">
      <SignUpLabel label="크루 이름" isRequire />
      <CommonInput
        inputName="crew"
        placeholder="크루를 선택해주세요"
        isSelectorInput
        isRequire
        isSelectorInputComplete={selectedCrewNameComplete}
        hasInputError={!!crewNameErrorMessage}
        onClick={(event) => {
          event && event.stopPropagation();
          modal.show();
        }}
      />
      {crewNameErrorMessage && <ErrorMessage text={crewNameErrorMessage} />}

      {crewList?.crewDetails && (
        <CrewSelectorModal
          crewList={crewList.crewDetails}
          handleSelectCrew={handleSelectCrew}
          handleSelectionComplete={handleSelectionComplete}
          isActive={modal.isVisible}
          onClose={onClose}
          selectedCrewName={selectedCrew}
        />
      )}
    </div>
  );
}
