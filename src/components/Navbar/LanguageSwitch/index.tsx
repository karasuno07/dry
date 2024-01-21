'use client';

import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import Menu from '@components/ui/Menu';
import { Link, usePathname } from '@lib/navigation';
import classNames from 'classnames/bind';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { FaGlobeAmericas, FaGlobeAsia } from 'react-icons/fa';
import { LocaleType } from 'types/locale';
import { SUPPORTED_LOCALES } from '~/constants/locales';
import styles from './LanguageSwitch.module.scss';

const cx = classNames.bind(styles);

type Props = {
  type?: 'mobile' | 'desktop';
};

export default function LanguageSwitch({ type = 'desktop' }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale() as LocaleType;
  const translate = useTranslations('general.lang');

  return (
    <Menu
      classes={{
        menuClassName: cx('root', { mobile: type === 'mobile' }),
        menuListClassName: cx('languages'),
      }}
      position='right'
      anchor={
        <Button className={cx('language-switch')} paddingLess title='Select display language'>
          <Icon icon={locale === 'en' ? FaGlobeAmericas : FaGlobeAsia} size={24} />
        </Button>
      }
      items={SUPPORTED_LOCALES.map((loc, idx) => (
        <div key={idx} className={cx('lang-item', { active: loc === locale })}>
          <span className={cx('abbreviation')}>{translate(`${loc}.abbreviation`)}</span>
          <Link href={pathname + '?' + searchParams.toString()} locale={loc}>
            {translate(`${loc}.name`)}
          </Link>
        </div>
      ))}
    />
  );
}
