import SearchBar from '@components/Navbar/SearchBar';
import Icon from '@components/elements/Icon';
import Menu from '@components/elements/Menu';
import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
import { FaBars } from 'react-icons/fa';
import LanguageSwitch from './LanguageSwitch';
import styles from './Navbar.module.scss';
import User from './User';

const cx = classNames.bind(styles);

type Props = {};

export default function NavBar({}: Props) {
  return (
    <nav className={cx('root')}>
      <div className={cx('container')}>
        <Link className={cx('logo')} href='/'></Link>
        <div className={cx('desktop')}>
          <SearchBar />
          <LanguageSwitch />
          <User />
        </div>
        <div className={cx('mobile')}>
          <Menu
            menuType='free'
            classes={{
              menuListClassName: cx('mobile-nav'),
            }}
            anchor={<Icon className={cx('mobile-nav-btn')} icon={FaBars} size={24} />}
            items={[]}
            position='right'
          />
        </div>
      </div>
    </nav>
  );
}
