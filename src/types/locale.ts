import { SUPPORTED_LOCALES } from '~/constants/locales';

export type LocaleType = (typeof SUPPORTED_LOCALES)[number];

export type PropsWithLocale = {
  params: {
    locale: string;
  };
};
