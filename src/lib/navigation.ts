import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from '~/constants/locales';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: SUPPORTED_LOCALES,
});
