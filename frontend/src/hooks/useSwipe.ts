'use client';

import { useRef, useCallback } from 'react';

interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

const SWIPE_THRESHOLD = 50;

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeCallbacks): SwipeHandlers {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = e.targetTouches[0].clientX;
    isSwiping.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.targetTouches[0].clientX;

    // If vertical movement exceeds horizontal, cancel swipe detection
    // This prevents interfering with normal scrolling
    const deltaY = Math.abs(e.targetTouches[0].clientY - touchStartY.current);
    const deltaX = Math.abs(touchEndX.current - touchStartX.current);
    if (deltaY > deltaX) {
      isSwiping.current = false;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX > 0) {
      // Swiped right (finger moved right)
      onSwipeRight?.();
    } else {
      // Swiped left (finger moved left)
      onSwipeLeft?.();
    }
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
