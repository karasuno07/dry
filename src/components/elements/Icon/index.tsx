import cx from 'classnames';
import { IconBaseProps } from 'react-icons';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  component: React.FunctionComponentElement<IconBaseProps>;
}

export default function Icon({ className, component, ...elementProps }: Props) {
  return (
    <span className={cx('react-icons', className)} {...elementProps}>
      {component}
    </span>
  );
}
