'use client';

import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { ImSearch } from 'react-icons/im';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {};

export default function SearchBar({}: Props) {
  const translate = useTranslations('components.searchBar');
  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickSearchIconHandler = () => {
    if (isEmpty(inputRef.current?.value)) {
      searchBarRef.current?.classList.toggle(cx('expanded'));
    } else {
      // TODO: search API handler
    }
  };

  return (
    <div ref={searchBarRef} className={cx('search-bar')}>
      <input
        ref={inputRef}
        type='search'
        placeholder={translate('placeholder')}
      />
      <Icon
        className={cx('search-icon')}
        component={<ImSearch size={21} />}
        onClick={onClickSearchIconHandler}
      />
    </div>
  );
}
