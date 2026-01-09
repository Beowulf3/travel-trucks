'use client';

import Link from 'next/link';

import css from './Header.module.css';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
  ];

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Link href="/" aria-label="Home" className={css.logo}>
            <svg width={136} height={16}>
              <use href="/sprite/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
          <nav className={css.nav}>
            <ul className={css.navList}>
              {navItems.map((item) => (
                <li key={item.href} className={css.navItem}>
                  <Link
                    key={item.href}
                    href={item.href}
                    className={pathname === item.href ? css.active : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
