import { useEffect, useState } from 'react';

export const MEDIA_QUERY = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
};

const getMatches = (query: string): boolean => {
  // Prevents SSR issues
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }
  return false;
};

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MEDIA_QUERY.MOBILE}px)`);
}

export function useIsNonMobile() {
  return useMediaQuery(`(min-width: ${MEDIA_QUERY.MOBILE}px + 1px)`);
}

export function useIsTablet() {
  return useMediaQuery(
    `(min-width: ${MEDIA_QUERY.TABLET}px) and (max-width: ${MEDIA_QUERY.DESKTOP}px - 1px)`
  );
}

export function useIsDesktop() {
  return useMediaQuery(`(min-width: ${MEDIA_QUERY.DESKTOP}px)`);
}
