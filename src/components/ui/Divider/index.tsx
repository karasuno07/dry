import classNames from 'classnames/bind';

import styles from './Divider.module.scss';

const cx = classNames.bind(styles);

type Props = {
  className?: string;
  direction?: 'horizontal' | 'vertical';
};

function Divider({ className, direction = 'horizontal' }: Props) {
  return (
    <span
      className={cx(
        'root',
        {
          'x-axis': direction === 'horizontal',
          'y-axis': direction === 'vertical',
        },
        className
      )}
    />
  );
}

export default Divider;
