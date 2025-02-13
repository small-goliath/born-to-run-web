'use client';

import { ReactElement, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLoginStateStore } from '@/store/useLoginStateStore';

import { ToastType, useToastStore } from '@/store/toastStore';

import ErrorIcon from '../icon/toastIcon/errorIcon.svg';
import InfoIcon from '../icon/toastIcon/infoIcon.svg';
import SuccessIcon from '../icon/toastIcon/successIcon.svg';
import WarningIcon from '../icon/toastIcon/warningIcon.svg';
import { cls } from '@/utils/cls';
import Portal from '../modal/Portal';

type Props = {
  isShowing: boolean | null;
  isClearOnPathChange?: boolean;
  bottom?: string | number;
};

export default function Toast({ isShowing, bottom = '10px', isClearOnPathChange = false }: Props) {
  const { toasts, removeToast, clearToast } = useToastStore();
  const {
    setLoginState,
    loginState: { isFirstLoggedIn, isFirstSignUp },
  } = useLoginStateStore();

  useEffect(() => {
    if (isShowing && toasts.length > 0) {
      const timer = setTimeout(() => {
        if (isFirstLoggedIn || isFirstSignUp) {
          setLoginState({ isFirstLoggedIn: null, isFirstSignUp: null });
        }

        removeToast(toasts[0].id);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isShowing, toasts, removeToast, isFirstLoggedIn, isFirstSignUp, setLoginState]);

  useEffect(() => {
    if (isClearOnPathChange) {
      clearToast();
    }
  }, [clearToast, isClearOnPathChange]);

  return (
    <Portal>
      <div
        style={{
          bottom,
        }}
        className={cls('fixed right-0 left-0 px-4 w-sm md:w-md m-auto z-40')}
      >
        {toasts.map((toast) => {
          const style = styleMap[toast.type];
          return (
            <AnimatePresence key={toast.id}>
              <motion.div
                variants={toastVariants}
                initial="initial"
                animate="visible"
                exit="exit"
                transition={{
                  ease: 'easeOut',
                  duration: 0.3,
                }}
              >
                <div
                  style={{
                    boxShadow: '0px 0px 1px 0px rgba(17, 17, 17, 0.30), 0px 8px 12px 0px rgba(17, 17, 17, 0.15)',
                  }}
                  className={`w-full mt-4 p-4 rounded-md flex items-center space-x-4 bg-secondary-N800`}
                >
                  {style.icon && <div>{style.icon}</div>}
                  <p className="text-body-md font-regular leading-body-md tracking-body-md text-secondary-N40">
                    {toast.message}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </Portal>
  );
}

type StyleMap = {
  icon?: ReactElement;
};

const styleMap: Record<ToastType, StyleMap> = {
  base: {},
  success: { icon: <SuccessIcon /> },
  info: { icon: <InfoIcon /> },
  error: { icon: <ErrorIcon /> },
  warn: { icon: <WarningIcon /> },
};

const toastVariants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
