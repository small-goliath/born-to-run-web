'use client';

import Image from 'next/image';
import { useState } from 'react';

import NotProfileIcon from '../icon/commonIcon/runacerNotProfileIcon.svg';
import AdminIcon from '../icon/commonIcon/adminIcon.svg';
import ManagerIcon from '../icon/commonIcon/managerIcon.svg';

import { CommunityWriter } from '@/service/community';
import { formatPostRegisterTime } from '@/utils/formatDate';

type Props = {
  onProfilePage: () => void;
  writerInfo: CommunityWriter;
  registeredAt: Date;
};

export default function Writer({ onProfilePage, writerInfo, registeredAt }: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div onClick={onProfilePage} className="flex items-center max-w-[12.375rem] cursor-pointer ">
      <div className="relative w-10 h-10 mr-2 flex flex-shrink-0justify-center items-center">
        {writerInfo?.profileImageUri ? (
          <Image
            className="rounded-lg"
            fill
            src={writerInfo?.profileImageUri}
            priority
            alt="avatar"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        ) : (
          <div
            data-testid="not-avatarIcon"
            className="bg-white absolute w-full h-full flex justify-center items-center rounded-full border-[1px] border-[#0000001A]"
          >
            <NotProfileIcon />
          </div>
        )}

        {!isImageLoaded && (
          <div
            data-testid="not-avatarIcon"
            className="bg-white absolute w-full h-full flex justify-center items-center rounded-full border-[1px] border-[#0000001A]"
          >
            <NotProfileIcon />
          </div>
        )}
      </div>

      <div className="space-y-1 text-body-sm font-regular leading-body-sm">
        {writerInfo?.userName && (
          <div className="flex items-center space-x-1">
            <span className="">{writerInfo?.userName.substring(0, 23)}</span>
            {(writerInfo?.isAdmin || writerInfo?.isManager) && (
              <div>{writerInfo?.isAdmin ? <AdminIcon /> : <ManagerIcon />}</div>
            )}
          </div>
        )}
        <div className="flex text-secondary-N90 ">
          <p className="line-clamp-2">
            {writerInfo?.crewName?.length > 33 ? `${writerInfo?.crewName.substring(0, 33)}...` : writerInfo?.crewName}
          </p>
          <div className="flex items-center flex-shrink-0">
            <span>﹒</span>
            <span>{formatPostRegisterTime(registeredAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
