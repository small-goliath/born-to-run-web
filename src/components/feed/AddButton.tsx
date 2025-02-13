'use client';

import { useScrollProgress } from '@/hooks/useScrollPosition';
import Link from 'next/link';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useModal } from '@/hooks/useModal';

import LoginModal from '../signup/LoginModal';

import { cls } from '@/utils/cls';
import { HeaderTab } from '@/data';

type Props = {
  headerTab: HeaderTab;
  isLoggedIn?: boolean;
  isUserError?: boolean;
};

export default function AddButton({ headerTab, isLoggedIn, isUserError }: Props) {
  const modal = useModal();
  const { isScrolledPercentage } = useScrollProgress(43);
  const pathname = usePathname();

  const disabled = false;

  const buttonVariants: Variants = {
    notScrolled: {
      width: '100px',
      transition: { duration: 0.3 },
    },
    scrolled: {
      width: '50px',
      transition: { duration: 0.3 },
    },
  };

  const openLoginModal = () => {
    if (isUserError || !isLoggedIn) modal.show();
  };

  const linkPathname = pathname === '/' ? '/community' : pathname;

  console.log('linkPathname ', linkPathname);
  console.log('isLoggedIn ', isLoggedIn);

  return (
    <div className="fixed left-0 right-0 bottom-20 w-sm m-auto flex  justify-end pointer-events-none md:w-md">
      <Link
        href={isLoggedIn ? `${linkPathname}/create?type=${headerTab.type}` : '#'}
        scroll={false}
        className="absolute bottom-0"
      >
        <motion.button
          onClick={openLoginModal}
          variants={buttonVariants}
          animate={isScrolledPercentage ? 'scrolled' : 'notScrolled'}
          style={{ boxShadow: '0px 4px 20px -1px rgba(17, 17, 17, 0.10), 0px 0px 4px 0px rgba(17, 17, 17, 0.10)' }}
          className={cls(
            disabled ? 'bg-secondary-N40' : '',
            'h-12 rounded-lg z-30 pointer-events-auto mr-4 bg-primary-G400 relative active:bg-primary-G500 hover:bg-primary-G300'
          )}
        >
          <div className={cls(isScrolledPercentage ? 'justify-center' : '', 'flex items-center')}>
            <AnimatePresence>
              {isScrolledPercentage ? (
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="absolute flex items-center justify-center right-0 left-0 m-auto"
                >
                  <path
                    d="M10.625 9.375V3.75H9.375V9.375H3.75V10.625H9.375V16.25H10.625V10.625H16.25V9.375H10.625Z"
                    fill="white"
                  />
                </motion.svg>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white text-label-md font-bold tracking-label-md absolute left-0 right-0 flex justify-center items-center"
                >
                  글쓰기
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </Link>

      <LoginModal closeLogin={modal.hide} isLoginModal={modal.isVisible} />
    </div>
  );
}
