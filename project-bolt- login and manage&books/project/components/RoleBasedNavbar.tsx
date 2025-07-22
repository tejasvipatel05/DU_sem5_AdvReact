'use client';

import { useState } from 'react';
import { BookOpen, User, Search, Bell, Menu, X, Crown, Sparkles, Settings, LogOut, Shield, Users, BarChart3, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, getRoleDisplayName, getRoleColor } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoleBasedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return null;

  const navigationItems = [
    { href: '/', label: '📚 Browse Books', permission: 'view_books' },
    { href: '/favorites', label: '❤️ My Favorites', permission: 'view_books' },
    { href: '/reading-list', label: '📖 Reading List', permission: 'view_books' },
    ...(hasPermission(user, 'manage_books') ? [
      { href: '/admin/books', label: '📝 Manage Books', permission: 'manage_books' },
    ] : []),
    ...(hasPermission(user, 'view_reports') ? [
      { href: '/admin/reports', label: '📊 Reports', permission: 'view_reports' },
    ] : []),
    ...(hasPermission(user, 'manage_users') ? [
      { href: '/admin/users', label: '👥 Manage Users', permission: 'manage_users' },
    ] : []),
    ...(hasPermission(user, 'system_admin') ? [
      { href: '/admin/system', label: '⚙️ System Admin', permission: 'system_admin' },
    ] : []),
  ];

  return (
    <header className="relative z-30 bg-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin">
                <Crown className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                ✨ Enchanted Library
              </h1>
              <p className="text-gray-600 font-medium">Where knowledge meets magic ⚡</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium hover:scale-105 transform"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Role Badge */}
            <Badge className={`bg-gradient-to-r ${getRoleColor(user.role)} text-white animate-pulse hidden sm:flex`}>
              {getRoleDisplayName(user.role)}
            </Badge>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hover:scale-110 transition-transform duration-200">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                {user.role === 'admin' ? '5' : user.role === 'librarian' ? '3' : '2'}
              </Badge>
            </Button>

            {/* User Menu */}
            <div className="relative group">
              <Button variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:scale-105 transition-all duration-200">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="hidden sm:inline">{user.name}</span>
              </Button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <Badge className={`bg-gradient-to-r ${getRoleColor(user.role)} text-white text-xs mt-1`}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start hover:bg-blue-50">
                      <User className="w-4 h-4 mr-3" />
                      My Profile
                    </Button>
                  </Link>
                  
                  {hasPermission(user, 'system_admin') && (
                    <Link href="/admin/settings">
                      <Button variant="ghost" className="w-full justify-start hover:bg-purple-50">
                        <Settings className="w-4 h-4 mr-3" />
                        System Settings
                      </Button>
                    </Link>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-red-50 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-gray-200 pt-6 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}