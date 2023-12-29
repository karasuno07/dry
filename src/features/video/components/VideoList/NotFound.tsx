import Button from '@components/elements/Button';
import Icon from '@components/elements/Icon';
import SSRImage from '@components/elements/Image/server/SSRImage';
import classNames from 'classnames/bind';
import { MdHome } from 'react-icons/md';
import noData from '~/assets/images/no-data.png';
import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);

export default function NotFound() {
  return (
    <div className={cx('not-found')}>
      <SSRImage className={cx('image')} externalLink={false} src={noData} alt='no-data' />
      <div className={cx('actions')}>
        <Button link={{ href: '/' }}>
          <Icon icon={MdHome} size={30} />
          <span>Go Back Home</span>
        </Button>
      </div>
    </div>
  );
}
