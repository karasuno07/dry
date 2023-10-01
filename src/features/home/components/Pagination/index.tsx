import Icon from '@components/elements/Icon';
import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import { ceil } from 'lodash';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

type PaginationOption =
  | 'first'
  | 'last'
  | 'prev'
  | 'next'
  | 'prev-part'
  | 'next-part';

type Props = {
  totalItems: number;
  params: SearchParams;
  maxDisplayedPage?: number;
  position?: 'left' | 'center' | 'right';
};

export default async function Pagination({
  totalItems,
  maxDisplayedPage = 5,
  params,
  position = 'center',
}: Props) {
  const currentPage = Number(params.page as string) || 1;
  const itemPerPage = Number(params.limit as string) || 12;
  const totalPage = ceil(totalItems / itemPerPage);
  const partNumber = ceil(currentPage / maxDisplayedPage);

  if (currentPage > totalPage) {
    notFound();
  }

  const buildSearchParams = (toPage: number | PaginationOption) => {
    let page;

    switch (toPage) {
      case 'first':
        page = 1;
        break;
      case 'prev-part':
        page = (partNumber - 1) * maxDisplayedPage;
        break;
      case 'prev':
        page = currentPage > 1 ? currentPage - 1 : currentPage;
        break;
      case 'next':
        page = currentPage < totalPage ? currentPage + 1 : totalPage;
        break;
      case 'next-part':
        page =
          (partNumber + 1) * maxDisplayedPage <= totalPage
            ? partNumber * maxDisplayedPage + 1
            : totalPage;
        break;
      case 'last':
        page = totalPage;
        break;
      default:
        page = toPage;
        break;
    }

    const newSearchParams = new URLSearchParams({
      ...params,
      page: String(page),
    });

    return `?${newSearchParams}`;
  };

  const renderPageItems = () => {
    function generateArrayValues(start: number, end: number) {
      return Array.from({ length: end - start }, (_, idx) => start + idx);
    }

    return (
      <>
        {currentPage > maxDisplayedPage && (
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
          (partNumber - 1) * maxDisplayedPage,
          partNumber * maxDisplayedPage <= totalPage
            ? partNumber * maxDisplayedPage
            : totalPage
        ).map((val) => {
          const pageNumber = val + 1;
          return (
            <li
              key={`page-${pageNumber}`}
              className={cx({
                active: pageNumber === currentPage,
              })}
            >
              <Link
                className={cx('page-item')}
                href={buildSearchParams(pageNumber)}
                scroll={false}
              >
                {pageNumber}
              </Link>
            </li>
          );
        })}
        {maxDisplayedPage * partNumber < totalPage &&
          maxDisplayedPage * partNumber >= maxDisplayedPage && (
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
        <li className={cx('page-navigation', { disabled: currentPage === 1 })}>
          <Link
            className={cx('page-item')}
            href={buildSearchParams('first')}
            scroll={false}
          >
            <Icon component={<LuChevronFirst />} />
          </Link>
        </li>
        <li className={cx('page-navigation', { disabled: currentPage === 1 })}>
          <Link
            className={cx('page-item')}
            href={buildSearchParams('prev')}
            scroll={false}
          >
            <Icon component={<LuChevronLeft />} />
          </Link>
        </li>
        {renderPageItems()}
        <li
          className={cx('page-navigation', {
            disabled: currentPage === totalPage,
          })}
        >
          <Link
            className={cx('page-item')}
            href={buildSearchParams('next')}
            scroll={false}
          >
            <Icon component={<LuChevronRight />} />
          </Link>
        </li>
        <li
          className={cx('page-navigation', {
            disabled: currentPage === totalPage,
          })}
        >
          <Link
            className={cx('page-item')}
            href={buildSearchParams('last')}
            scroll={false}
          >
            <Icon component={<LuChevronLast />} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
