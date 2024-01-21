import Menu from '@components/ui/Menu';
import classNames from 'classnames/bind';
import { getTranslations } from 'next-intl/server';
import { FaThList } from 'react-icons/fa';
import styles from './CategorySelector.module.scss';

const cx = classNames.bind(styles);

export default async function Skeleton() {
  const translate = await getTranslations('videos');

  const title = translate('types.movie') + ': ' + translate('category.default');

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
      <span className={cx('title')}>{title}</span>
    </div>
  );
}
