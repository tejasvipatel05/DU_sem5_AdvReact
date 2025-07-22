'use client';
import Link from 'next/link';
import navstyles from '@/styles/Navbar.module.css';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={navstyles.navbar}>
      <div className={navstyles.logo}>Beauty Salon</div>
      <div className={navstyles.links}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className={navstyles.toggleWrapper} onClick={toggleTheme}>
          <span className={navstyles.icon}>🌞</span>
        <div className={`${navstyles.toggle} ${theme === 'dark' ? navstyles.dark : ''}`}/>
          <span className={navstyles.icon}>🌜</span>
      </div>
    </nav>
  );
}
