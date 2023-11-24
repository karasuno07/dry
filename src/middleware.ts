
import nextIntlMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './constants/locales';

const middleware = nextIntlMiddleware({
  locales: SUPPORTED_LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
});

export default middleware;

export const config = {
  matcher: ['/', '/(en|vi)/:path*'], // TODO: should be dynamically based on supported locales definition
};
