import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./dictionary/${locale}.json`)).default,
  timeZone: 'Asia/Ho_Chi_Minh',
}));
