import { useCallback, useEffect, useRef, useState } from 'react';

function useInfiniteScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const markerRef = useRef(null);

  const options = {
    root: null,
    rootMargin: '0px',
  };

  const observe = () => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, options);

    if (markerRef.current) {
      observer.observe(markerRef.current);
    }

    return () => {
      if (markerRef.current) {
        observer.unobserve(markerRef.current);
      }
    };
  };

  return { isScrolled, markerRef, observe };
}

const useScrollProgress = (percentage?: number, px?: number) => {
  const [isScrolledPercentage, setIsScrolledPercentage] = useState(false);
  const [isScrolledPx, setIsScrolledPx] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = (scrollTop / docHeight) * 100;

    // 퍼센티지 기준
    if (percentage && scrolledPercentage >= percentage) {
      setIsScrolledPercentage(true);
    } else {
      setIsScrolledPercentage(false);
    }

    // 픽셀 기준
    if (px && scrollTop >= px) {
      setIsScrolledPx(true);
    } else {
      setIsScrolledPx(false);
    }
  }, [percentage, px]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isScrolledPercentage, isScrolledPx };
};

function useScrollToTop() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return scrollToTop;
}

export { useInfiniteScroll, useScrollProgress, useScrollToTop };
