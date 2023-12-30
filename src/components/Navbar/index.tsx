import SearchBar from '@components/Navbar/SearchBar';
import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
import LanguageSwitch from './LanguageSwitch';
import styles from './Navbar.module.scss';
import User from './User';

const cx = classNames.bind(styles);

type Props = {};

export default function NavBar({}: Props) {
  // const user = await getCurrentUser();

  // console.log('User:', user);

  return (
    <nav className={cx('root')}>
      <div className={cx('container')}>
        <Link className={cx('logo')} href='/'></Link>
        <SearchBar />
        <LanguageSwitch />
        <User />
      </div>
    </nav>
  );
}
