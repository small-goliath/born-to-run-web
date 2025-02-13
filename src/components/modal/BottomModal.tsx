import { AnimatePresence, motion, Variants } from 'framer-motion';

import CloseIcon from '../icon/commonIcon/CloseIcon';
import ChevronIcon from '../icon/commonIcon/chevron.svg';
import Portal from './Portal';

const bottomModalVariants: Variants = {
  initial: {
    translateY: '100%',
  },
  animate: {
    translateY: '0%',
  },
  exit: {
    translateY: '100%',
  },
};

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  closeType?: 'back' | 'close';
  title?: string;
  height?: number;
};

export default function BottomModal({ children, isActive, closeType, title, onClose, height }: Props) {
  return (
    <Portal>
      <AnimatePresence>
        {isActive && (
          <div className="w-full h-full absolute left-0 right-0 bottom-0 top-0 z-50">
            <div onClick={onClose} className="absolute w-full h-full bg-black bg-opacity-60" />
            <motion.div
              variants={bottomModalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                ease: 'easeOut',
                duration: 0.3,
              }}
              style={{ height }}
              className="absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl w-sm m-auto md:w-md p-4"
            >
              <div className="flex items-center justify-between">
                {closeType === 'back' ? (
                  <button onClick={onClose}>
                    <ChevronIcon />
                  </button>
                ) : (
                  <div />
                )}
                <p className="absolute m-auto flex justify-center text-black text-title-lg font-bold leading-title-lg left-1/2 transform -translate-x-1/2">
                  {title}
                </p>
                {closeType === 'close' ? (
                  <button onClick={onClose}>
                    <CloseIcon />
                  </button>
                ) : (
                  <div />
                )}
              </div>
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
