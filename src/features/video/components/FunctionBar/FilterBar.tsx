'use client';

import Icon from '@components/ui/Icon';
import useDebouncedSearch from '@features/video/hooks/useDebouncedSearch';
import { isEmpty } from '@lib/object';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useRef, useState } from 'react';
import { MdFilterAlt as Filter } from 'react-icons/md';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

export default function FilterBar() {
  const translate = useTranslations('features.video.functionBar.filter');
  const filterBar = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>('');

  useDebouncedSearch('q', query.toLowerCase(), setQuery);

  const onClickFilterIconHandler = () => {
    if (isEmpty(inputRef.current?.value)) {
      filterBar.current?.classList.toggle(cx('expanded'));
    } else {
      // TODO: search/filter API handler
    }
  };

  return (
    <div ref={filterBar} className={cx('filter-bar')}>
      <input
        ref={inputRef}
        type='search'
        value={query}
        placeholder={translate('placeholder')}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => setQuery(evt.target.value)}
      />
      <Icon
        icon={Filter}
        className={cx('filter-icon')}
        size={21}
        onClick={onClickFilterIconHandler}
      />
    </div>
  );
}
