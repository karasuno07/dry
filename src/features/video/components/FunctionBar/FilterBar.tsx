'use client';

import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { MdFilterAlt as Filter } from 'react-icons/md';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

export default function FilterBar() {
  const translate = useTranslations('features.video.functionBar.filter');
  const filterBar = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        placeholder={translate('placeholder')}
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
