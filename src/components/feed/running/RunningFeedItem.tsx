'use client';

import Link from 'next/link';

import MarathonListBookmark from './marathon/MarathonListBookmark';

import { MarathonItem } from '@/service/marathon';

interface Props {
  item: MarathonItem;
}

export default function RunningFeedItem({ item }: Props) {
  const handleBookmarkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <Link href={`/marathon/${item.marathonId}`} className="border p-2 rounded-md">
      <div className="flex justify-between h-[60px]">
        <p className="text-title-lg font-bold leading-title-lg tracking-title-lg max-w-[272px]">{item.title}</p>
        <div className="w-10 h-8 flex justify-end" onClick={handleBookmarkClick}>
          <MarathonListBookmark isBookmarking={item.isBookmarking} feedId={item.marathonId} />
        </div>
      </div>

      <div className="text-body-sm text-secondary-N200 flex items-center">
        <p>{item.schedule}</p>
        <span>﹒</span>
        <p>{item.venue}</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <p className="text-label-sm font-md text-primary-G400">{item.course}</p>
          </div>
          {/* <div className="text-label-md font-bold tracking-label-md flex items-center gap-1">
            <span>0/8명 참여</span>
            <span className="text-primary-G400">모집중</span>
          </div> */}
        </div>

        {/* <div className="relative w-16 h-16">
          <div className="absolute w-full h-full bg-slate-400 rounded-md" />
        </div> */}
      </div>
    </Link>
  );
}
