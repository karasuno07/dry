'use client';

import Button from '@components/elements/Button';
import Icon from '@components/elements/Icon';
import Menu from '@components/elements/Menu';
import { Link, usePathname } from '@lib/navigation';
import classNames from 'classnames/bind';
import { FcGlobe } from 'react-icons/fc';
import { SUPPORTED_LOCALES } from '~/constants/locales';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

type Props = {};

export default function LanguageSwitch({}: Props) {
  const pathname = usePathname();

  return (
    <Menu
      classes={{
        menuClassName: cx('language-switch'),
        menuListClassName: cx('languages'),
      }}
      anchor={
        <Button className={cx('language-switch')} paddingLess>
          <Icon icon={FcGlobe} size={28} />
        </Button>
      }
      items={SUPPORTED_LOCALES.map((locale, idx) => (
        <Link key={idx} href={pathname} locale={locale}>
          {locale}
        </Link>
      ))}
    />
  );
}
