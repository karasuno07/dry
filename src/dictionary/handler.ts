'use client';

import { IntlError } from 'next-intl';

export function customErrorHandler(error?: IntlError) {
  if (process.env.NODE_ENV === 'production') {
    return;
  } else {
    console.error(error);
  }
}
