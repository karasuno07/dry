'use client';

import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

type PaginationOption = 'first' | 'last' | 'prev' | 'next';

type Props = {
  totalItems: number;
  itemPerPage: number;
  position?: 'left' | 'center' | 'right';
};

export default function Pagination({
  totalItems,
  itemPerPage,
  position = 'center',
}: Props) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPage = Math.floor(totalItems / itemPerPage);

  const buildSearchParams = (toPage: number | PaginationOption) => {
    let page;

    switch (toPage) {
      case 'first':
        page = 1;
        break;
      case 'prev':
        page = currentPage > 1 ? currentPage - 1 : currentPage;
        break;
      case 'next':
        page = currentPage < totalPage ? currentPage + 1 : totalPage;
        break;
      case 'last':
        page = totalPage;
        break;
      default:
        page = toPage;
        break;
    }

    const newSearchParams = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: String(page),
    });

    return `?${newSearchParams}`;
  };

  return (
    <div
      className={cx('root', {
        [position]: true,
      })}
    >
      <ul className={cx('container')}>
        <li className={cx('page-navigation')}>
          <Link href={buildSearchParams('first')} scroll={false}>
            <Icon component={<LuChevronFirst />} />
          </Link>
        </li>
        <li className={cx('page-navigation')}>
          <Link href={buildSearchParams('prev')} scroll={false}>
            <Icon component={<LuChevronLeft />} />
          </Link>
        </li>
        {Array(totalPage)
          .fill(0)
          .map((_, idx) => {
            const pageNumber = idx + 1;
            return (
              <li
                key={`page-${pageNumber}`}
                className={cx({
                  active: pageNumber === currentPage,
                })}
              >
                <Link href={buildSearchParams(pageNumber)} scroll={false}>
                  {pageNumber}
                </Link>
              </li>
            );
          })}
        <li className={cx('page-navigation')}>
          <Link href={buildSearchParams('next')} scroll={false}>
            <Icon component={<LuChevronRight />} />
          </Link>
        </li>
        <li className={cx('page-navigation')}>
          <Link href={buildSearchParams('last')} scroll={false}>
            <Icon component={<LuChevronLast />} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
