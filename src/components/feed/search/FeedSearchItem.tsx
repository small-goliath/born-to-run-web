'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import CloseIcon from '@/components/icon/commonIcon/CloseIcon';

type Props = {
  isKeywordDeleteLoading?: boolean;
  keyword: string;
  deleteKeyword: (keyword: string) => void;
};

export default function FeedSearchItem({ keyword, isKeywordDeleteLoading, deleteKeyword }: Props) {
  return (
    <li onClick={() => deleteKeyword(keyword)} className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-title-md font-medium leading-title-md tracking-title-md">{keyword}</span>
      <span>{isKeywordDeleteLoading ? <LoadingSpinner /> : <CloseIcon color="#B7B7B7" />}</span>
    </li>
  );
}
