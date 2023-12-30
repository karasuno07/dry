import SessionProvider from '@components/providers/SessionProvider';
import '@stylesheets/global.scss';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { PropsWithLocale } from 'types/locale';
import { SUPPORTED_LOCALES } from '~/constants/locales';
import { customErrorHandler } from '~/dictionary/handler';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocalizationLayout({
  children,
  params: { locale },
}: PropsWithChildren<PropsWithLocale>) {
  if (!SUPPORTED_LOCALES.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`~/dictionary/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages} onError={customErrorHandler}>
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
