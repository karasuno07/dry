import SessionProvider from '@components/providers/SessionProvider';
import '@stylesheets/global.scss';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { PropsWithChildren } from 'react';
import { PropsWithLocale } from 'types/locale';
import { SUPPORTED_LOCALES } from '~/constants/locales';
import { customErrorHandler, getMessageFallback } from '~/dictionary/handler';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default function LocalizationLayout({
  children,
  params: { locale },
}: PropsWithChildren<PropsWithLocale>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          onError={customErrorHandler}
          getMessageFallback={getMessageFallback}
        >
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
