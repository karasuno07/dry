'use client';

import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import LanguageSwitch from './LanguageSwitch';
import styles from './Navbar.module.scss';
import SearchBar from './SearchBar';
import User from './User';

const cx = classNames.bind(styles);

type Props = {};

export default function NavList({}: Props) {
  const [showMobileNav, toggleMobileNav] = useState<boolean>(false);

  const toggleMobileNavHandler = () => toggleMobileNav((prevState) => !prevState);

  return (
    <>
      <LanguageSwitch type='mobile' />
      <Icon
        className={cx('mobile-nav-btn', { active: showMobileNav })}
        icon={FaBars}
        size={24}
        onClick={toggleMobileNavHandler}
      />
      <div className={cx('nav-items', { 'mobile-nav': showMobileNav })}>
        <SearchBar />
        <LanguageSwitch />
        <User />
      </div>
    </>
  );
}
