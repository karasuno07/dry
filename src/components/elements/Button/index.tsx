import Link from 'next/link';
import React from 'react';

export type ButtonProps = {
  className?: string;
  variant?: 'primary' | 'danger' | 'success' | 'warning';
  square?: boolean;
  fullSize?: boolean;
  paddingLess?: boolean;
  link?: {
    href: string;
    external?: boolean;
  };
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className,
  variant,
  square,
  fullSize,
  paddingLess,
  type = 'button',
  link,
  children,
  ...props
}: ButtonProps) => {
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-violet-500 hover:bg-violet-700 text-white';
      case 'danger':
        return 'bg-red-500 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-500 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-700 text-white';
      default:
        return 'bg-transparent text-black';
    }
  };

  let Component: any = 'button';
  if (link) {
    if (link.external) {
      Component = 'a';
    } else {
      Component = Link;
    }
  }

  return (
    <Component
      href={link?.href}
      type={type}
      className={`
        ${fullSize ? 'min-w-full' : 'min-w-max'}
        ${getVariant()} transition duration-500  ${!paddingLess && 'py-2 px-4'}  ${
          !square && 'rounded-md'
        } active:scale-95 ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
