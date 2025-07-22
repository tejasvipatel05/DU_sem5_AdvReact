// app/services/page.tsx
'use client';

import styles from '@/styles/Service.module.css';

const services = [
  {
    icon: '💇‍♀️',
    title: 'Hair Styling',
    description: 'Trendy cuts, smooth blowouts, and stylish curls to refresh your look.',
  },
  {
    icon: '🧖‍♀️',
    title: 'Skin Treatments',
    description: 'Brightening facials, de-tan cleanups, and hydration therapy.',
  },
  {
    icon: '💅',
    title: 'Nail Art & Care',
    description: 'Gel polish, nail extensions, and custom nail art for every occasion.',
  },
  {
    icon: '💄',
    title: 'Makeup Services',
    description: 'Daywear, glam, or bridal — makeup designed for your features.',
  },
  {
    icon: '🧘‍♀️',
    title: 'Spa & Massage',
    description: 'Unwind with deep tissue massages, aromatherapy, and hot stone therapy.',
  },
  {
    icon: '🧴',
    title: 'Body Care',
    description: 'Scrubs, wraps, and moisturizing treatments to keep your skin glowing.',
  },
];

export default function ServicesPage() {
  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Explore Our Services</h1>
      <div className={styles.grid}>
        {services.map((service, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{service.icon}</div>
            <h2 className={styles.title}>{service.title}</h2>
            <p className={styles.description}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
