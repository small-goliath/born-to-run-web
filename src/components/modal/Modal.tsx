import Portal from './Portal';
import { cls } from '@/utils/cls';

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  isCenter?: boolean;
  notHasBackLayer?: boolean;
  onClose?: () => void;
};

export default function Modal({ children, isActive, isCenter, notHasBackLayer, onClose }: Props) {
  return (
    <Portal>
      {isActive && (
        <div
          aria-hidden={true}
          className={cls(
            isCenter ? 'flex justify-center items-center' : '',
            'fixed top-0 bottom-0 left-0 right-0 z-50 m-auto'
          )}
        >
          <div
            onClick={onClose}
            className={cls(notHasBackLayer ? '' : 'bg-black bg-opacity-60', 'absolute w-full h-full')}
          />
          {children}
        </div>
      )}
    </Portal>
  );
}
