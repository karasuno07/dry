import { IntlError, IntlErrorCode } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./dictionary/${locale}.json`)).default,
  timeZone: 'Asia/Ho_Chi_Minh',
  onError(error) {
    console.error(error);
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
      return path + ' is not yet translated';
    } else {
      return 'Dear developer, please fix this message: ' + path;
    }
  },
}));
