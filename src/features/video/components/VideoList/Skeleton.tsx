import Grid from '@components/elements/Grid';
import { SkeletonPreviewer } from '@features/video/components/Previewer';
import classNames from 'classnames/bind';
import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);

export default function Skeleton() {
  return (
    <section>
      <Grid className={cx('root', 'skeleton')} template='cols'>
        {Array(12)
          .fill(0)
          .map((_, idx) => (
            <SkeletonPreviewer key={idx} />
          ))}
      </Grid>
    </section>
  );
}
