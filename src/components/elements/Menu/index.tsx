'use client';

import { ButtonAsLinkProps } from '@components/elements/Button';
import classNames from 'classnames/bind';
import { isArray } from 'lodash';
import React, { JSXElementConstructor, useEffect, useRef, useState } from 'react';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

type ClickableElementProps = React.HTMLProps<HTMLElement> & {
  onClick?: (..._args: any) => void;
};

interface MenuProps extends Omit<React.HTMLProps<HTMLDivElement>, 'className'> {
  classes?: {
    menuClassName?: string;
    menuListClassName?: string;
    menuItemClassName?: string;
  };
  position?: 'left' | 'right';
  hover?: boolean;
  menuType?: 'flex' | 'grid' | 'free';
  dropdownAnimation?: 'scale' | 'grow' | 'pulse';
  anchor: React.ReactElement;
  items: React.ReactElement | React.ReactElement[];
}

function Menu({
  classes,
  position,
  hover,
  menuType = 'flex',
  dropdownAnimation = 'scale',
  anchor,
  items,
  ...componentProps
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const inboundOnClickHandler = (evt: React.MouseEvent<Element>) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains('bypass-evt')) {
      return;
    }
    setShow((prevState) => !prevState);
  };

  const outboundOnClickHandler = (evt: MouseEvent) => {
    const target = evt.target as Node;
    if (!menuRef.current?.contains(target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (!hover) {
      document.addEventListener('click', outboundOnClickHandler);
    } else {
      document.removeEventListener('click', outboundOnClickHandler);
    }

    return () => {
      document.removeEventListener('click', outboundOnClickHandler);
    };
  }, [hover]);

  const getMappedPropsAnchor = () => {
    if (React.isValidElement(anchor)) {
      const childProps = anchor.props as ClickableElementProps;
      const props: ClickableElementProps = {
        ...childProps,
        className: cx(
          childProps.className,
          'cursor-pointer',
          {
            active: show,
          },
          childProps.className
        ),
        onClick: !hover ? inboundOnClickHandler : undefined,
      };
      return React.cloneElement(anchor, props);
    }
    return anchor;
  };

  const renderItems = () => {
    function processItem(item: React.ReactElement, key?: string | number) {
      const elementType = item.type as JSXElementConstructor<any>;
      const itemProps = item.props as ClickableElementProps & ButtonAsLinkProps;
      const itemComponent = React.cloneElement(item, {
        ...itemProps,
        className: cx(itemProps.className, { 'menu-item': menuType === 'free' }),
        onClick:
          itemProps.onClick || itemProps.link
            ? (evt: React.MouseEvent<Element>) => {
                inboundOnClickHandler(evt);
                if (itemProps.onClick) {
                  itemProps.onClick(evt);
                }
              }
            : undefined,
      });

      return elementType.name === 'Divider' || menuType === 'free' ? (
        itemComponent
      ) : (
        <li
          key={key}
          className={cx('menu-item', classes?.menuItemClassName)}
          onClick={itemProps.onClick ? undefined : inboundOnClickHandler}
        >
          {itemComponent}
        </li>
      );
    }

    if (isArray(items)) {
      return items.map((item, idx) => processItem(item, idx));
    } else {
      return processItem(items);
    }
  };


  return (
    <div
      ref={menuRef}
      className={cx('root', classes?.menuClassName, { hover })}
      {...componentProps}
    >
      {getMappedPropsAnchor()}
      {hover && <div className={cx('hoverable-space')} />}
      <ul
        ref={listRef}
        className={cx(
          'menu-list',
          {
            [menuType]: true,
            visible: show,
            'position-left': position === 'left',
            'position-right': position === 'right',
            'scale-animate': dropdownAnimation === 'scale',
            'grow-animate': dropdownAnimation === 'grow',
            'pulse-animate': dropdownAnimation === 'pulse',
          },
          classes?.menuListClassName
        )}
      >
        {renderItems()}
      </ul>
    </div>
  );
}

export default Menu;
