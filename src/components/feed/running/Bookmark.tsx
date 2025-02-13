'use client';

import BookmarkIcon from '@/components/icon/commonIcon/bookmarkIcon.svg';
import BookmarkIconFill from '@/components/icon/commonIcon/bookmarkIconFill.svg';

interface Props {
  isBookmark?: boolean;
  toggleBookmarking: () => void;
}

export default function Bookmark({ isBookmark = false, toggleBookmarking }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleBookmarking();
  };
  return (
    <button className="flex" onClick={handleClick}>
      {isBookmark ? <BookmarkIconFill /> : <BookmarkIcon />}
    </button>
  );
}
