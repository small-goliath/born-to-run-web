'use client';

import { TextareaHTMLAttributes } from 'react';

type Props = {} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function CreateContent({ ...props }: Props) {
  return (
    <textarea
      {...props}
      className="w-full appearance-none bg-transparent border-none outline-none resize-none py-3 px-4 placeholder:text-body-lg placeholder:font-regular placeholder:leading-body-lg placeholder:tracking-body-lg text-base font-medium leading-title-md tracking-title-md min-h-[23.4rem]"
    />
  );
}
