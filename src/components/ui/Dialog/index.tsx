import classNames from 'classnames/bind';
import { ReactNode, useEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { IoWarning } from 'react-icons/io5';
import { MdInfo, MdOutlineError } from 'react-icons/md';
import Divider from '../Divider';
import Icon from '../Icon';
import styles from './Dialog.module.scss';

const cx = classNames.bind(styles);

type Props = {
  className?: string;
  severity?: 'info' | 'error' | 'warning';
  icon?: IconType;
  open: boolean;
  title: ReactNode;
  content: ReactNode;
  actions?: ReactNode;
};

export default function Dialog({
  className,
  severity = 'info',
  icon,
  open,
  title,
  content,
  actions,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  let severityIcon;
  switch (severity) {
    case 'info':
      severityIcon = MdInfo;
      break;
    case 'error':
      severityIcon = MdOutlineError;
      break;
    case 'warning':
      severityIcon = IoWarning;
      break;
    default:
      severityIcon = icon;
      break;
  }

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (open) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className={cx('root', className)}>
      <div
        className={cx('header', {
          [severity]: true,
        })}
      >
        {severity && <Icon className='mr-2' icon={severityIcon} size={25} />}
        {title}
      </div>
      <div className={cx('content')}>{content}</div>
      {actions && (
        <>
          <Divider />
          <div className={cx('actions')}>{actions}</div>
        </>
      )}
    </dialog>
  );
}
