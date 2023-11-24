import { getRequestConfig } from 'next-intl/server';
import { customErrorHandler } from './dictionary/handler';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./dictionary/${locale}.json`)).default,
  timeZone: 'Asia/Ho_Chi_Minh',
  onError(error) {
    customErrorHandler(error);
  },
}));
