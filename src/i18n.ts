import { IntlError, IntlErrorCode, createTranslator } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import enMessagages from '~/dictionary/en.json';
import { DEFAULT_LOCALE } from './constants/locales';

const defaultTranslation = createTranslator({ locale: DEFAULT_LOCALE, messages: enMessagages });

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./dictionary/${locale}.json`)).default,
  timeZone: 'Asia/Ho_Chi_Minh',
  onError(error) {
    if (error.code !== IntlErrorCode.MISSING_MESSAGE) {
      console.error(error);
    }
  },
  getMessageFallback({
    namespace,
    key,
    error,
  }: {
    namespace: string;
    key: string;
    error: IntlError;
  }) {
    const path = [namespace, key].filter((part) => part != null).join('.');
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      return defaultTranslation(path);
    } else {
      return 'Dear developer, please fix this message: ' + path;
    }
  },
}));
