'use client';

import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, PanInfo, motion } from 'framer-motion';

type Props = {
  imageUris: string[];
};

function ImageSlider({ imageUris }: Props) {
  const [activeIndex, setActiveIndex] = useState(imageUris.length - 1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleDragImage = (event: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
    if (!isImageLoaded) return;
    if (offset.x > 50 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (offset.x < -50 && activeIndex < imageUris.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };
  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeIndex]);

  return (
    <div className="relative w-full h-[21.25rem] md:min-h-[48rem]">
      <AnimatePresence>
        <motion.div className="relative w-full h-full">
          <Image
            src={imageUris[activeIndex] || '/assets/notImage.png'}
            fill
            className="object-cover"
            alt="feed-image"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMsqgcAAWkA844c0PgAAAAASUVORK5CYII="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
          {!isImageLoaded && (
            <div className="absolute w-full h-full flex justify-center items-center bg-secondary-N30">
              <p className="font-semibold text-secondary-N200">이미지를 로드할 수 없습니다.</p>
            </div>
          )}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(event, info) => handleDragImage(event, info)}
            key={activeIndex}
            className="absolute w-full h-full cursor-pointer"
          />
        </motion.div>
      </AnimatePresence>

      {imageUris.length > 1 && (
        <div className="absolute px-2 max-h-4 z-30 bottom-2 right-0 left-0 flex justify-center items-center space-x-2 cursor-pointer">
          {imageUris.map((_, index) => (
            <svg
              key={index}
              onClick={() => setActiveIndex(index)}
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
            >
              <circle cx="4" cy="4" r="4" fill="white" fillOpacity={activeIndex === index ? 1 : 0.4} />
            </svg>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(ImageSlider);
