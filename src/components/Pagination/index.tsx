'use client';

import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { ceil, isUndefined, min } from 'lodash';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { LuChevronFirst, LuChevronLast, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

type PaginationOption = 'first' | 'last' | 'prev' | 'next' | 'prev-part' | 'next-part';

type Props = {
  totalItems?: number;
  totalPage?: number;
  itemPerPage?: number;
  maxDisplayedPage?: number;
  maxTotalPage?: number;
  position?: 'left' | 'center' | 'right';
};

export default function Pagination({
  totalItems,
  totalPage,
  itemPerPage = 12,
  maxDisplayedPage = 5,
  maxTotalPage = 500,
  position = 'center',
}: Props) {
  if (isUndefined(totalItems) && isUndefined(totalPage)) {
    throw new Error(
      `Can not initialize pagination bar due to lack of neccessary props: ['totalItems', 'totalPage']\n
      Provide at least one of these props to render component`
    );
  }

  const searchParams = useSearchParams();

  const _currentPage = Number(searchParams.get('page')) || 1;
  const _itemPerPage = Number(searchParams.get('limit')) || itemPerPage;
  const _totalPage = min([
    totalPage || ceil((totalItems as number) / _itemPerPage),
    maxTotalPage,
  ]) as number;
  const _partNumber = ceil(_currentPage / maxDisplayedPage);

  if (_currentPage > _totalPage) {
    notFound();
  }

  const buildSearchParams = (toPage: number | PaginationOption) => {
    let page;

    switch (toPage) {
      case 'first':
        page = 1;
        break;
      case 'prev-part':
        page = (_partNumber - 1) * maxDisplayedPage;
        break;
      case 'prev':
        page = _currentPage > 1 ? _currentPage - 1 : _currentPage;
        break;
      case 'next':
        page = _currentPage < _totalPage ? _currentPage + 1 : _totalPage;
        break;
      case 'next-part':
        page =
          (_partNumber + 1) * maxDisplayedPage <= _totalPage
            ? _partNumber * maxDisplayedPage + 1
            : _totalPage;
        break;
      case 'last':
        page = _totalPage;
        break;
      default:
        page = toPage;
        break;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());

    return `?${newSearchParams}`;
  };

  const renderPageItems = () => {
    function generateArrayValues(start: number, end: number) {
      return Array.from({ length: end - start }, (_, idx) => start + idx);
    }

    return (
      <>
        {_currentPage > maxDisplayedPage && (
          <li className={cx('page-navigation')}>
            <Link
              className={cx('page-item', 'font-black')}
              href={buildSearchParams('prev-part')}
              scroll={false}
            >
              ...
            </Link>
          </li>
        )}
        {generateArrayValues(
          (_partNumber - 1) * maxDisplayedPage,
          _partNumber * maxDisplayedPage <= _totalPage ? _partNumber * maxDisplayedPage : _totalPage
        ).map((val) => {
          const pageNumber = val + 1;
          return (
            <li
              key={`page-${pageNumber}`}
              className={cx({
                active: pageNumber === _currentPage,
              })}
            >
              <Link className={cx('page-item')} href={buildSearchParams(pageNumber)} scroll={false}>
                {pageNumber}
              </Link>
            </li>
          );
        })}
        {maxDisplayedPage * _partNumber < _totalPage &&
          maxDisplayedPage * _partNumber >= maxDisplayedPage && (
            <li className={cx('page-navigation')}>
              <Link
                className={cx('page-item', 'font-black')}
                href={buildSearchParams('next-part')}
                scroll={false}
              >
                ...
              </Link>
            </li>
          )}
      </>
    );
  };

  return (
    <div
      className={cx('root', {
        [position]: true,
      })}
    >
      <ul className={cx('container')}>
        <li className={cx('page-navigation', { disabled: _currentPage === 1 })}>
          <Link className={cx('page-item')} href={buildSearchParams('first')} scroll={false}>
            <Icon icon={LuChevronFirst} />
          </Link>
        </li>
        <li className={cx('page-navigation', { disabled: _currentPage === 1 })}>
          <Link className={cx('page-item')} href={buildSearchParams('prev')} scroll={false}>
            <Icon icon={LuChevronLeft} />
          </Link>
        </li>
        {renderPageItems()}
        <li
          className={cx('page-navigation', {
            disabled: _currentPage === _totalPage,
          })}
        >
          <Link className={cx('page-item')} href={buildSearchParams('next')} scroll={false}>
            <Icon icon={LuChevronRight} />
          </Link>
        </li>
        <li
          className={cx('page-navigation', {
            disabled: _currentPage === _totalPage,
          })}
        >
          <Link className={cx('page-item')} href={buildSearchParams('last')} scroll={false}>
            <Icon icon={LuChevronLast} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
