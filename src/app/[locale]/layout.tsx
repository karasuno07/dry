import NavBar from '@components/navbar';
import { Session } from 'next-auth';
import { NextIntlClientProvider as IntlProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';

import '@stylesheets/global.scss';

type LayoutProps = {
  params: {
    locale: string;
    session: Session;
  };
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  let messages;

  try {
    messages = (await import(`~/dictionary/${params.locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body>
        <IntlProvider locale={params.locale} messages={messages}>
          <NavBar />
          <main>{children}</main>
        </IntlProvider>
      </body>
    </html>
  );
}
