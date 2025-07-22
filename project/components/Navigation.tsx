"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  User, 
  Bell, 
  Menu, 
  X,
  Home,
  Search,
  Users,
  Settings,
  Award,
  Calendar,
  LogOut,
  Shield
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(4);
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuth();

  // Dynamic navigation based on user role
  const getNavItems = () => {
    const baseItems = [
      { href: '/dashboard', label: 'Dashboard', icon: BookOpen, roles: ['admin', 'librarian', 'student'] },
      { href: '/catalog', label: 'Catalog', icon: Search, roles: ['admin', 'librarian', 'student'] },
    ];

    const roleSpecificItems = [
      { href: '/student/reading-challenge', label: 'Reading Challenge', icon: Award, roles: ['student'] },
      { href: '/librarian/borrowings', label: 'Borrowings', icon: BookOpen, roles: ['librarian', 'admin'] },
      { href: '/admin/users', label: 'User Management', icon: Users, roles: ['admin'] },
      { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
    ];

    return [...baseItems, ...roleSpecificItems].filter(item => 
      item.roles.includes(user?.role || '')
    );
  };

  const navItems = getNavItems();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-600 bg-red-50';
      case 'librarian': return 'text-blue-600 bg-blue-50';
      case 'student': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case 'admin': return '👑';
      case 'librarian': return '📚';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LibraryPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="relative hover:scale-110 transition-all duration-300">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0 animate-pulse"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Profile */}
            <div className="hidden sm:flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRoleColor(user?.role || '')}`}>
                {getRoleEmoji(user?.role || '')}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hidden sm:inline-flex hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:scale-110"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            {/* Old notification button - remove this */}
            {/* <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                >
                  {notifications}
                </Badge>
              )}
            </Button> */}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRoleColor(user?.role || '')}`}>
                    {getRoleEmoji(user?.role || '')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                <Link href="/notifications" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start mb-2">
                    <Bell className="w-5 h-5 mr-3" />
                    Notifications
                    {notifications > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;