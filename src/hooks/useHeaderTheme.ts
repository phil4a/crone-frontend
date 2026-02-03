'use client';

import { useEffect, useRef } from 'react';
import { useHeaderStore, HeaderTheme } from '@/store/header';

export const useHeaderTheme = (theme: HeaderTheme) => {
  const setTheme = useHeaderStore((state) => state.setTheme);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme(theme);
          }
        });
      },
      {
        // Detect when the element is near the top of the viewport
        // rootMargin: '-80px 0px -80% 0px' means:
        // Top: -80px (header height approx)
        // Bottom: -80% (ignore bottom part of screen)
        // This ensures we trigger when the element is actually "under" the header area
        rootMargin: '-80px 0px -90% 0px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [theme, setTheme]);

  return elementRef;
};
