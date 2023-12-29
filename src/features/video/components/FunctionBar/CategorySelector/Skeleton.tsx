import Menu from '@components/elements/Menu';
import classNames from 'classnames/bind';
import { getTranslations } from 'next-intl/server';
import { FaThList } from 'react-icons/fa';
import styles from './CategorySelector.module.scss';

const cx = classNames.bind(styles);

export default async function Skeleton() {
  const translate = await getTranslations();

  return (
    <div className={cx('root')}>
      <Menu
        menuType='free'
        dropdownAnimation='pulse'
        classes={{
          menuListClassName: cx('category-menu'),
        }}
        anchor={<FaThList className={cx('select-icon')} size={24} />}
        items={[]}
      />
      <span className={cx('title')}>{translate('general.category.default')}</span>
    </div>
  );
}
