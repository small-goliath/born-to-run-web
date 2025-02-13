import { ReactElement } from 'react';
import DangerIcon from '../icon/messageIcon/dangerMessageIcon.svg';
import InfoIcon from '../icon/messageIcon/infoMessageIcon.svg';
import WarningIcon from '../icon/messageIcon/warnMessageIcon.svg';

type Props = {
  type: MessageType;
  text: string;
};

export default function MessageBox({ type, text }: Props) {
  const style = styleMap[type];
  return (
    <div className={`${style.bg} space-x-2 p-4 flex items-center rounded-md`}>
      <div>{style.icon}</div>
      <p className={`${style.text} text-body-md font-regular leading-body-md tracking-body-md`}>{text}</p>
    </div>
  );
}

type MessageType = 'info' | 'warn' | 'danger';

type StyleMap = {
  bg: string;
  text: string;
  icon: ReactElement;
};

const styleMap: Record<MessageType, StyleMap> = {
  info: {
    bg: 'bg-system-b-B50',
    text: 'text-system-b-B400',
    icon: <InfoIcon />,
  },
  warn: {
    bg: 'bg-system-y-Y50',
    text: 'text-secondary-N800',
    icon: <WarningIcon />,
  },
  danger: {
    bg: 'bg-system-r-R50',
    text: 'text-secondary-N800',
    icon: <DangerIcon />,
  },
};
