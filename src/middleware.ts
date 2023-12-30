import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './constants/locales';

export default function middleware(request: NextRequest) {
  const intlMiddleware = createIntlMiddleware({
    locales: SUPPORTED_LOCALES as unknown as string[],
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: 'as-needed',
    pathnames: {
      '/discover': '/',
    },
  });

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
