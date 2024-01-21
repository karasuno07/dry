'use client';

import Icon from '@components/ui/Icon';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { MdOutlineSearch as Search } from 'react-icons/md';
import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  className?: string;
};

export default function SearchBar({ className }: Props) {
  const translate = useTranslations('components.navBar.search');
  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInboundClickHandler = () => {
    searchBarRef.current?.classList.remove(cx('collapsed'));
    searchBarRef.current?.classList.add(cx('expanded'));
    searchBarRef.current?.focus();
  };

  const outboundOnClickHandler = (evt: MouseEvent) => {
    const target = evt.target as Node;

    if (!searchBarRef.current?.contains(target)) {
      searchBarRef.current?.classList.remove(cx('expanded'));
      searchBarRef.current?.classList.add(cx('collapsed'));
    }
  };

  useEffect(() => {
    document.addEventListener('click', outboundOnClickHandler);

    return () => {
      document.removeEventListener('click', outboundOnClickHandler);
    };
  }, []);

  return (
    <div className={cx('search-bar', className)} ref={searchBarRef} onClick={onInboundClickHandler}>
      <input
        ref={inputRef}
        type='search'
        name='search-bar'
        id='search-bar'
        placeholder={translate('placeholder')}
      />
      <Icon className={cx('search-icon')} icon={Search} size={30} />
    </div>
  );
}
