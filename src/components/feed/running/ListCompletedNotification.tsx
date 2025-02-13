'use client';

import OutlineButton from '@/components/common/commonButton/OutlineButton';

interface Props {
  description?: string;
  listTypeTitle: '마라톤' | '모임';
  onSelectListType: () => void;
}

export default function ListCompletedNotification({ listTypeTitle, onSelectListType, description }: Props) {
  return (
    <div className="flex flex-col text-center justify-center items-center gap-4 py-12 mb-[104px]">
      <div className="text-body-lg leading-body-lg tracking-body-lg text-secondary-N200">
        <p>일정을 모두 불러왔어요.</p>
        <p>{description}</p>
      </div>

      <div className="min-w-[110px]">
        <OutlineButton
          height="h-[2.5rem]"
          type="active"
          text={`${listTypeTitle === '마라톤' ? '모임' : '마라톤'} 둘러보기`}
          scale="sm"
          onClick={onSelectListType}
        />
      </div>
    </div>
  );
}
