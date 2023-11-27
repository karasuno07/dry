import LoadableImage from '@components/elements/LoadableImage';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {
  title: string;
  backdropImage: string;
};

function Previewer({ title, backdropImage }: Props) {
  return (
    <div className={cx('root')}>
      <div className={cx('backdrop-container')}>
        <LoadableImage src={backdropImage || ''} alt='#' fill />
      </div>
      <div className={cx('info')}>
        <Link className={cx('title')} href={'/'} title={title}>
          {title}
        </Link>
      </div>
    </div>
  );
}

export default Previewer;
