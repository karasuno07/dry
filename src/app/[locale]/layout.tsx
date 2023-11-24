import NavBar from '@components/Navbar';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';
import { SUPPORTED_LOCALES } from '~/constants/locales';
import { customErrorHandler } from '~/dictionary/handler';

import '@stylesheets/global.scss';

type LayoutProps = {
  params: {
    locale: string;
  };
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  if (!SUPPORTED_LOCALES.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`~/dictionary/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages} onError={customErrorHandler}>
          <NavBar />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
