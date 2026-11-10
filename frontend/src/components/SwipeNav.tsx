'use client';

import { useRouter } from 'next/navigation';
import { useSwipe } from '@/hooks/useSwipe';

interface SwipeNavProps {
  children: React.ReactNode;
}

export function SwipeNav({ children }: SwipeNavProps) {
  const router = useRouter();

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipeRight: () => {
      // Swipe right (finger moves right) = go back in browser history
      router.back();
    },
    onSwipeLeft: () => {
      // Swipe left (finger moves left) = go forward in browser history
      window.history.forward();
    },
  });

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}
