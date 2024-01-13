'use client';

import { IntlError, IntlErrorCode, createTranslator } from 'next-intl';
import { DEFAULT_LOCALE } from '~/constants/locales';
import enMessagages from '~/dictionary/en.json';

export function customErrorHandler(error?: IntlError) {
  if (process.env.NODE_ENV === 'production') {
    return;
  } else if (error?.code !== IntlErrorCode.MISSING_MESSAGE) {
    console.error(error);
  }
}

export function getMessageFallback({
  namespace,
  key,
  error,
}: {
  namespace: string;
  key: string;
  error: IntlError;
}) {
  const defaultTranslation = createTranslator({ locale: DEFAULT_LOCALE, messages: enMessagages });
  const path = [namespace, key].filter((part) => part != null).join('.');
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return defaultTranslation(path);
  } else {
    return 'Dear developer, please fix this message: ' + path;
  }
}
