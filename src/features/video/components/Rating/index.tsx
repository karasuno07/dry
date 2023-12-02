'use client';

import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import { IconType } from 'react-icons';
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';
import styles from './Rating.module.scss';

const cx = classNames.bind(styles);

type Props = {
  value: number;
  count?: number;
  editable?: boolean;
  halfValued?: boolean;
  iconSize?: string | number;
  filledIcon?: IconType;
  halfIcon?: IconType;
  emptyIcon?: IconType;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  onChange?: (nextValue: number) => void;
};

function Rating({
  value,
  count = 5,
  editable = false,
  halfValued = true,
  iconSize,
  filledIcon = FaStar,
  halfIcon = FaRegStarHalfStroke,
  emptyIcon = FaRegStar,
  activeColor = '#FED900',
  inactiveColor = '#FED900',
  className,
  onChange,
}: Props) {
  const [currentValue, setCurrentValue] = useState<number>(value);
  const clickHandler = (nextValue: number, e: any) => {
    if (!editable) return;
    if (halfValued) {
      const xPos =
        (e.pageX - e.currentTarget?.getBoundingClientRect()?.left) / e.currentTarget?.offsetWidth;

      if (xPos <= 0.5) {
        nextValue -= 0.5;
      }
    }
    setCurrentValue(nextValue);
    if (typeof onChange === 'function') onChange(nextValue);
  };

  return (
    <div className={cx('root', className)}>
      {Array(count)
        .fill(0)
        .map((_, idx) => {
          const roundedValue = Math.round(currentValue * 2) / 2;
          const isActive = Math.floor(roundedValue) >= idx + 1;
          const isHalfActive = roundedValue === idx + 0.5;

          const StarIcon = isHalfActive ? halfIcon : isActive ? filledIcon : emptyIcon;

          return (
            <span key={idx} className={cx({ editable })} onClick={(e) => clickHandler(idx + 1, e)}>
              <StarIcon
                size={iconSize}
                color={isActive || isHalfActive ? activeColor : inactiveColor}
              />
            </span>
          );
        })}
    </div>
  );
}

export default memo(Rating);
