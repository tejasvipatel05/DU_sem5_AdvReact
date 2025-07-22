'use client';
import Link from 'next/link';
import landingstyles from '@/styles/Landing.module.css';

export default function ContactPage() {
  return (
    <div className={landingstyles.contact}>
      <h2 className={landingstyles.contact}>Contact</h2>
      <p className={landingstyles.contact}>Reach us via email or social media.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
