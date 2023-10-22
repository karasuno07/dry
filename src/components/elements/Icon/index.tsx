import cx from 'classnames';
import { IconBaseProps, IconType } from 'react-icons';

interface IconProps extends Omit<IconBaseProps, 'onClick'> {
  icon: IconType;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  iconClassName?: string;
}

export default function Icon({
  icon,
  className,
  onClick,
  onDoubleClick,
  iconClassName,
  ...props
}: IconProps) {
  const iconProps = {
    ...props,
    className: iconClassName,
  };
  const IconElement = icon;

  return (
    <span className={cx('react-icons', className)} onClick={onClick}>
      <IconElement {...iconProps} />
    </span>
  );
}
