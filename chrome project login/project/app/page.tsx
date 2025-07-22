"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Users, Calendar, Star, TrendingUp, Bell, Search, Menu, User, Settings, Sparkles, Zap, Heart, Award, Target, Flame } from 'lucide-react';
import Link from 'next/link';

const FloatingParticle = ({ delay = 0 }) => (
  <div 
    className="absolute w-2 h-2 bg-blue-300/20 rounded-full animate-pulse"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }}
  />
);

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const StatCard = ({ icon: Icon, title, value, description, color = "blue", delay = 0, animated = false }) => (
  <Card 
    className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 border-l-4 border-l-${color}-500 bg-gradient-to-br from-white via-${color}-50/30 to-white`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`} />
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <Sparkles className={`w-4 h-4 text-${color}-400 animate-pulse`} />
    </div>
    <CardHeader className="relative z-10">
      <div className="flex items-center space-x-4">
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-${color}-400 to-${color}-600 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <CardTitle className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {animated ? <AnimatedCounter end={parseInt(value.replace(/,/g, ''))} /> : value}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 font-medium">{title}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="relative z-10">
      <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
      <div className={`mt-3 h-1 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </CardContent>
  </Card>
);

const FeatureCard = ({ icon: Icon, title, description, color = "blue", delay = 0 }) => (
  <Card 
    className="group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 border-0 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12">
      <Zap className="w-5 h-5 text-yellow-400" />
    </div>
    <CardHeader className="text-center pb-4 relative z-10">
      <div className={`mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-${color}-400 via-${color}-500 to-${color}-600 flex items-center justify-center text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl relative`}>
        <Icon className="w-10 h-10" />
        <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mt-4">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="relative z-10">
      <CardDescription className="text-center text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </CardDescription>
      <div className="mt-4 flex justify-center">
        <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </CardContent>
  </Card>
);

const PulsingBadge = ({ children, color = "blue" }) => (
  <Badge className={`bg-gradient-to-r from-${color}-500 to-${color}-600 text-white animate-pulse hover:animate-none transition-all duration-300 hover:scale-110`}>
    {children}
  </Badge>
);

const GlowingButton = ({ children, variant = "default", className = "", ...props }) => (
  <Button 
    variant={variant}
    className={`relative overflow-hidden group transition-all duration-300 hover:scale-105 ${className}`}
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </Button>
);

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.2} />
      ))}
      
      {/* Mouse Follower Effect */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20 pointer-events-none z-10 transition-all duration-300"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-7 h-7 text-white relative z-10" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LibraryPro
                </span>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 font-medium">
                Dashboard
              </Link>
              <Link href="/catalog" className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 font-medium">
                Catalog
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 font-medium">
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <GlowingButton variant="outline" className="hidden sm:inline-flex border-2">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </GlowingButton>
              <GlowingButton className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started
              </GlowingButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Modern Library
              </span>
              <div className="absolute -top-4 -right-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 relative">
              Management System
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-pulse" />
            </h2>
          </div>
          
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            🚀 Streamline your library operations with our comprehensive management system. 
            Handle books, users, borrowing, and more with beautiful interfaces and powerful features.
          </p>
          
          {/* Animated Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <PulsingBadge color="blue">📚 Smart Catalog</PulsingBadge>
            <PulsingBadge color="green">👥 User Management</PulsingBadge>
            <PulsingBadge color="purple">📅 Auto Borrowing</PulsingBadge>
            <PulsingBadge color="pink">⭐ Reviews & Ratings</PulsingBadge>
            <PulsingBadge color="yellow">🏆 Reading Challenges</PulsingBadge>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl p-2 shadow-xl border-2 border-gray-100">
                <div className="flex items-center">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <Input 
                    placeholder="🔍 Search books, authors, or ISBN..."
                    className="pl-14 pr-32 py-4 text-lg border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <GlowingButton className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-6">
                    <Zap className="w-4 h-4 mr-2" />
                    Search
                  </GlowingButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <StatCard
            icon={BookOpen}
            title="Total Books"
            value="12,456"
            description="📖 Across all branches"
            color="blue"
            delay={100}
            animated={true}
          />
          <StatCard
            icon={Users}
            title="Active Users"
            value="3,247"
            description="🎓 Students & Faculty"
            color="green"
            delay={200}
            animated={true}
          />
          <StatCard
            icon={Calendar}
            title="Books Borrowed"
            value="8,932"
            description="📅 This month"
            color="purple"
            delay={300}
            animated={true}
          />
          <StatCard
            icon={TrendingUp}
            title="Reading Score"
            value="94.2%"
            description="😊 Satisfaction rate"
            color="pink"
            delay={400}
          />
        </div>

        {/* Enhanced Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12 relative">
            <h2 className="text-5xl font-bold text-gray-800 mb-4 relative inline-block">
              Powerful Features
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-spin flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              🎯 Everything you need to manage a modern library efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              icon={BookOpen}
              title="🔍 Smart Catalog"
              description="Advanced search, filtering, and categorization with real-time availability tracking and AI-powered recommendations"
              color="blue"
              delay={100}
            />
            <FeatureCard
              icon={Users}
              title="👥 User Management"
              description="Role-based access control for admins, librarians, and students with detailed profiles and activity tracking"
              color="green"
              delay={200}
            />
            <FeatureCard
              icon={Calendar}
              title="📅 Borrowing System"
              description="Automated borrowing, renewals, and return tracking with smart notifications and penalty management"
              color="purple"
              delay={300}
            />
            <FeatureCard
              icon={Star}
              title="⭐ Reviews & Ratings"
              description="Community-driven book reviews and ratings to help users discover great reads with social features"
              color="yellow"
              delay={400}
            />
            <FeatureCard
              icon={Award}
              title="🏆 Reading Challenges"
              description="Gamified reading experience with leaderboards, badges, achievement tracking, and reward systems"
              color="pink"
              delay={500}
            />
            <FeatureCard
              icon={Bell}
              title="🔔 Smart Notifications"
              description="Real-time alerts for due dates, reservations, fines, new arrivals with customizable preferences"
              color="indigo"
              delay={600}
            />
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20" />
          <div className="relative text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white overflow-hidden">
            <div className="absolute top-4 left-4 animate-bounce">
              <Heart className="w-6 h-6 text-pink-200" />
            </div>
            <div className="absolute top-4 right-4 animate-pulse">
              <Flame className="w-6 h-6 text-orange-200" />
            </div>
            <div className="absolute bottom-4 left-1/4 animate-spin">
              <Target className="w-5 h-5 text-blue-200" />
            </div>
            <div className="absolute bottom-4 right-1/4 animate-bounce">
              <Award className="w-5 h-5 text-yellow-200" />
            </div>
            
            <h2 className="text-5xl font-bold mb-4 relative">
              Ready to Transform Your Library? 🚀
            </h2>
            <p className="text-xl mb-8 opacity-90">
              ✨ Join thousands of libraries using LibraryPro to enhance their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GlowingButton size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-110 shadow-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
              </GlowingButton>
              <GlowingButton size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:scale-110">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Demo
              </GlowingButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}