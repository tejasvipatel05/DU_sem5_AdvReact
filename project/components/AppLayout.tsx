"use client";

import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import LoginPage from '@/components/LoginPage';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = ['/'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading LibraryPro...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated and not on public route
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return <LoginPage />;
  }

  return (
    <>
      {isAuthenticated && <Navigation />}
      {children}
    </>
  );
};

export default AppLayout;