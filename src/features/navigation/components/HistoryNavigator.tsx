'use client';

import { useRouter } from '@lib/navigation';

type Props = Omit<React.HTMLProps<HTMLAnchorElement>, 'onClick'> & {
  action: 'back' | 'forward' | 'push' | 'replace';
};

export default function HistoryNagivator({
  action,
  href,
  children,
  ...anchorProps
}: React.PropsWithChildren<Props>) {
  const router = useRouter();
  if (href) {
    router.prefetch(href);
  }

  const navigationHandler = () => {
    switch (action) {
      case 'back':
        router.back();
        break;
      case 'forward':
        router.forward();
        break;
      case 'push':
        if (href) router.push(href);
        break;
      case 'replace':
        if (href) router.replace(href);
        break;
      default:
        break;
    }
  };

  return (
    <a href='#' onClick={navigationHandler} {...anchorProps}>
      {children}
    </a>
  );
}
