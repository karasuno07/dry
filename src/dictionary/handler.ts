'use client';

import { IntlError, IntlErrorCode } from 'next-intl';

export function customErrorHandler(error?: IntlError) {
  if (process.env.NODE_ENV === 'production') {
    return;
  } else if (error?.code !== IntlErrorCode.MISSING_MESSAGE) {
    console.error(error);
  }
}
