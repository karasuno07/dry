import cx from 'classnames';
import { isUndefined } from 'lodash';
import Link from 'next/link';

type Props = {
  href?: string;
  external?: boolean;
  variant?: 'default' | 'dark' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink';
  rounded?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & React.HTMLAttributes<HTMLElement>;

export default function Badge({
  href,
  external,
  variant = 'default',
  rounded = false,
  size = 'sm',
  className,
  children,
  ...props
}: React.PropsWithChildren<Props>) {
  const baseClasses = isUndefined(href)
    ? 'bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5'
    : 'bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center';

  const textSizeClass = `text-${size}`;

  const variantClasses = {
    'dark:bg-blue-900 dark:text-blue-300': variant === 'default',
    'dark:bg-gray-700 dark:text-gray-300': variant === 'dark',
    'dark:bg-red-900 dark:text-red-300': variant === 'red',
    'dark:bg-green-900 dark:text-green-300': variant === 'green',
    'dark:bg-yellow-900 dark:text-yellow-300': variant === 'yellow',
    'dark:bg-indigo-900 dark:text-indigo-300': variant === 'indigo',
    'dark:bg-purple-900 dark:text-purple-300': variant === 'purple',
    'dark:bg-pink-900 dark:text-pink-300': variant === 'pink',
  };

  const badgeClasses = cx(
    baseClasses,
    textSizeClass,
    {
      rounded: rounded === false,
      'rounded-full': rounded === true,
      ...variantClasses,
    },
    className
  );
  if (isUndefined(href)) {
    return (
      <span className={badgeClasses} {...props}>
        {children}
      </span>
    );
  } else {
    const badgeLinkClasses = cx(baseClasses, textSizeClass, className);
    const LinkComponent = external ? 'a' : Link;
    return (
      <LinkComponent href={href} className={badgeLinkClasses} {...props}>
        {children}
      </LinkComponent>
    );
  }
}
