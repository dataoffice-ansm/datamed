import { useEffect, useLayoutEffect } from 'react';

export const isSafari = () => typeof window === 'object' && /apple/i.test(window.navigator.vendor);

export const isMobile = () => {
  if (!isBrowser) return false;
  if (window.innerWidth < 400) return true;
  return /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(
    window.navigator.userAgent
  );
};

export const isSsr =
  typeof window === 'undefined' ||
  !window.navigator ||
  /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);

export const isBrowser = !isSsr;

export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
