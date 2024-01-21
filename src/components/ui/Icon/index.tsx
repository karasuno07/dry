import cx from 'classnames';
import { forwardRef } from 'react';
import { IconBaseProps, IconType } from 'react-icons';

interface IconProps extends Omit<IconBaseProps, 'onClick'> {
  icon: IconType;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  iconClassName?: string;
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { icon, className, onClick, onDoubleClick, iconClassName, ...props },
  ref
) {
  const iconProps = {
    ...props,
    className: iconClassName,
  };
  const IconElement = icon;

  return (
    <span ref={ref} className={cx('react-icons', className)} onClick={onClick}>
      <IconElement {...iconProps} />
    </span>
  );
});

export default Icon;
