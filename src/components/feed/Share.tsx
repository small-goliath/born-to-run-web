'use client';

import { useCallback, useRef } from 'react';
import { useCloseOnOutSideClick } from '@/hooks/useCloseOnOutsideClick';
import { useToastStore } from '@/store/toastStore';

import BottomModal from '../modal/BottomModal';

import ShareLinkIcon from '../icon/commonIcon/linkIcon.svg';
import KakaoChatIcon from '../icon/kakaoChatIcon.svg';

type Props = {
  shareTitle?: string;
  shareDescription?: string;
  shareImageUrl?: string;
  shareLikeCount?: number;
  hideShareModal: () => void;
  isShareModal: boolean;
};

export default function Share({
  shareDescription,
  shareImageUrl,
  shareTitle,
  shareLikeCount,
  hideShareModal,
  isShareModal,
}: Props) {
  const { addToast } = useToastStore();

  const copyCurrentUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      addToast({ type: 'base', message: '링크를 복사했어요.' });
    } catch (e) {
      addToast({ type: 'error', message: '복사 실패하였습니다.' });
    }
    hideShareModal();
  }, [addToast, hideShareModal]);

  const kakaoShare = useCallback(() => {
    if (!shareDescription) return;
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '',
        description: shareDescription,
        imageUrl: shareImageUrl || '',
        link: {
          mobileWebUrl:
            process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000/',
          webUrl: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000/',
        },
      },

      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
    hideShareModal();
  }, [hideShareModal, shareDescription, shareImageUrl]);

  return (
    <div>
      <BottomModal isActive={isShareModal} onClose={hideShareModal} title="공유" closeType="close">
        <div className="relative p-4">
          <div className="w-full flex items-center">
            {/* 링크 */}
            <div
              onClick={copyCurrentUrl}
              className="w-1/2 flex flex-col justify-center items-center space-y-2 cursor-pointer"
            >
              <div className="w-16 h-16 bg-secondary-N60 flex justify-center items-center rounded-full">
                <ShareLinkIcon />
              </div>
              <p className="text-black text-body-sm leading-body-sm">링크 복사</p>
            </div>

            {/* 카카오톡 */}
            <div
              onClick={kakaoShare}
              className="w-1/2 flex flex-col justify-center items-center space-y-2 cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#FEE500] flex justify-center items-center rounded-full">
                <KakaoChatIcon />
              </div>
              <p className="text-black text-body-sm leading-body-sm">카카오톡</p>
            </div>
          </div>
        </div>
      </BottomModal>
    </div>
  );
}
