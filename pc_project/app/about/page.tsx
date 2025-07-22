'use client';
import Link from 'next/link';
import landingstyles from '@/styles/Landing.module.css';

export default function AboutPage() {
  return (
    <div className={landingstyles.about}>
      <h2 className={landingstyles.about}>About</h2>
      <p className={landingstyles.about}>This is the about page.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
