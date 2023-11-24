import Menu from '@components/elements/Menu';
import { CategoryResponse } from '@model/Categories';
import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import { assign } from 'lodash';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaThList } from 'react-icons/fa';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  list: CategoryResponse[];
  params: SearchParams;
};

function CategorySelector({ list, params }: Props) {
  const translate = useTranslations();

  const current = list.find((c) => c.slug === params.category);

  const buildSearchParams = ({ category }: { category: string }) => {
    const newSearchParams: { [key: string]: any } = { ...params };
    assign(newSearchParams, { category });
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  return (
    <div className={cx('list')}>
      <Menu
        menuType='grid'
        dropdownAnimation='pulse'
        classes={{
          menuClassName: cx('category-menu'),
          menuListClassName: 'grid-rows-4 grid-flow-col gap-y-1',
        }}
        anchor={<FaThList className={cx('selector')} size={24} />}
        items={list.map((category) => (
          <Link
            key={category.id}
            className='block w-full h-full'
            href={buildSearchParams({ category: category.slug })}
          >
            {category.name}
          </Link>
        ))}
      />
      <span className={cx('title')}>{current?.name || translate('general.category.default')}</span>
    </div>
  );
}

export default CategorySelector;
