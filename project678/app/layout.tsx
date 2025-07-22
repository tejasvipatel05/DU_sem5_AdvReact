import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serene Beauty Studio - Transform Your Natural Beauty',
  description: 'Premium beauty services including hair styling, skincare, makeup, and wellness treatments. Experience luxury and artistry at Serene Beauty Studio.',
  keywords: 'beauty salon, hair styling, skincare, makeup, wellness, spa, premium beauty services',
  authors: [{ name: 'Serene Beauty Studio' }],
  openGraph: {
    title: 'Serene Beauty Studio - Transform Your Natural Beauty',
    description: 'Premium beauty services including hair styling, skincare, makeup, and wellness treatments.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}