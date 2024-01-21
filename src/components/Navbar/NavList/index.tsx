'use client';

import Icon from '@components/ui/Icon';
import SignOutButton from '@features/authentication/components/SignOutButton';
import { useIsMobile } from '@hooks/useMediaQuery';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import LanguageSwitch from '../LanguageSwitch';
import SearchBar from '../SearchBar';
import User from '../User';
import styles from './NavList.module.scss';

const cx = classNames.bind(styles);

type Props = {};

export default function NavList({}: Props) {
  const translate = useTranslations('components.navBar');
  const isMobile = useIsMobile();
  const mobileBtnRef = useRef<HTMLSpanElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [showMobileNav, toggleMobileNav] = useState<boolean>(false);

  const toggleMobileNavHandler = () => toggleMobileNav((prevState) => !prevState);

  const outboundOnClickHandler = (evt: MouseEvent) => {
    const target = evt.target as Node;
    if (!mobileBtnRef.current?.contains(target) && !navItemsRef.current?.contains(target)) {
      toggleMobileNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', outboundOnClickHandler);

    return () => {
      window.removeEventListener('click', outboundOnClickHandler);
    };
  }, []);

  return (
    <>
      {isMobile && <LanguageSwitch type='mobile' />}
      {isMobile && (
        <Icon
          ref={mobileBtnRef}
          className={cx('mobile-nav-btn', { active: showMobileNav })}
          icon={FaBars}
          size={24}
          onClick={toggleMobileNavHandler}
        />
      )}
      <div ref={navItemsRef} className={cx('nav-items', { 'mobile-nav': showMobileNav })}>
        <SearchBar />
        {!isMobile && <LanguageSwitch />}
        {!isMobile && <User />}
        {isMobile && <SignOutButton className={cx('mobile-sign-out')} type='mobile' />}
      </div>
    </>
  );
}
