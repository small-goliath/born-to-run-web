import { useFormContext } from 'react-hook-form';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { cls } from '@/utils/cls';
import ChevronDownIcon from '@/components/icon/commonIcon/ChevronDownIcon';

type Props = {
  placeholder?: string;
  inputName: string;
  hasInputError?: boolean;
  isRequire?: boolean;
  isSelectorInput?: boolean;
  isSelectorInputComplete?: boolean;
  height?: string;
  minLength?: {
    value: number;
    message: string;
  };
  onClick?: (event?: React.MouseEvent) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function CommonInput({
  onChange,
  placeholder,
  isRequire,
  inputName,
  onClick,
  isSelectorInput,
  hasInputError,
  minLength,
  isSelectorInputComplete,
  height,
}: Props) {
  const { register, reset, getValues, setValue, watch } = useFormContext();
  const [isTextCompleted, setIsTextCompleted] = useState(false);
  const notBlank = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, '');
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isInputComplete = isTextCompleted || isSelectorInputComplete;
  const textInputState = !hasInputError && !isInputComplete && !!watch(inputName) && watch(inputName) !== '';

  const textInputReset = useCallback(() => {
    reset({ [inputName]: null });
    setIsTextCompleted(false);
  }, [inputName, reset]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    notBlank(e);
    onChange && onChange(e);
    setIsTextCompleted(false);
    setValue(inputName, e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget instanceof SVGElement) {
      return;
    }
    if (!hasInputError && getValues(inputName)) {
      setIsTextCompleted(true);
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    inputRef.current?.focus();
    onClick && onClick(e);
  };

  const { ref, ...rest } = register(inputName, {
    ...(isRequire && { required: isRequire }),
    minLength: minLength,
  });

  return (
    <div onClick={handleInputClick} className="relative">
      <input
        {...rest}
        readOnly={isSelectorInput}
        type="text"
        maxLength={20}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        className={cls(
          `px-4 w-full border-[1px] rounded-md  focus:outline-none placeholder:text-body-lg placeholder:leading-body-lg placeholder:tracking-body-lg placeholder:text-secondary-N60 text-title-md font-md text-black leading-title-md tracking-title-md bg-secondary-N10 focus:bg-white ${
            height || 'h-12 '
          }`,
          isInputComplete ? 'bg-secondary-N10' : '',
          hasInputError
            ? 'border-system-r-R400 focus:caret-system-r-R400'
            : 'focus:caret-primary-G400 focus:border-primary-G400 border-secondary-N40  hover:border-secondary-N60',
          isSelectorInput ? 'cursor-pointer' : ''
        )}
      />
      {isSelectorInput && (
        <div
          aria-label="chevron-down-icon"
          className="absolute right-4 top-0 bottom-0 flex justify-center items-center"
        >
          <ChevronDownIcon />
        </div>
      )}
      {!isInputComplete && textInputState && (
        <svg
          aria-label="input-reset-icon"
          tabIndex={-1}
          className="absolute right-4 top-0 bottom-0 m-auto cursor-pointer"
          onClick={textInputReset}
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
  );
}
