'use client';
import Link from "next/link";
import homestyles from '../styles/Home.module.css';
import { useTheme } from '@/context/ThemeContext';
import landingstyles from '@/styles/Landing.module.css';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={landingstyles.container}>
        <section className={landingstyles.hero}>
            <h1 className={landingstyles.hero}>RIDNO STUDIO</h1>
            <p className={landingstyles.hero}>
              Our beauty salon successfully provides quality services in the field of beauty and cosmetology,
              carefully caring for each client
            </p>
        </section>
      </div>
  );
}