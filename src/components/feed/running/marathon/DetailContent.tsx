import { cls } from '@/utils/cls';

interface Props {
  content?: string;
  isAccent?: boolean;
  hasPadding?: boolean;
}

export default function DetailContent({ content, isAccent = false, hasPadding = false }: Props) {
  return (
    <p
      className={cls(
        hasPadding ? 'py-2' : 'py-0',
        isAccent ? 'text-primary-G400' : 'text-secondary-N900',
        'text-title-md leading-title-md tracking-title-md font-medium'
      )}
    >
      {content}
    </p>
  );
}
