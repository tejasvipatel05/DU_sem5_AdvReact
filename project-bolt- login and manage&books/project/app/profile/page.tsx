'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Heart, Clock, TrendingUp, Settings, Bell, Award, Zap, Star, Crown, ArrowLeft, Calendar, Target, Trophy, Flame } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleDisplayName, getRoleColor } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingBooks from '@/components/FloatingBooks';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const newAchievements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setAchievements(newAchievements);
  }, []);

  if (!user) return null;

  const stats = [
    { 
      title: 'Books Read', 
      value: user.booksRead, 
      icon: BookOpen, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      title: 'Checked Out', 
      value: user.booksCheckedOut, 
      icon: Clock, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    { 
      title: 'Favorites', 
      value: 23, 
      icon: Heart, 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700'
    },
    { 
      title: 'This Month', 
      value: 12, 
      icon: TrendingUp, 
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
  ];

  const recentBooks = [
    { title: 'Clean Code', progress: 85, dueDate: '2025-01-20' },
    { title: 'Sapiens', progress: 65, dueDate: '2025-01-15' },
    { title: 'The Art of War', progress: 100, dueDate: 'Completed' },
  ];

  const achievements_list = [
    { name: '📚 Bookworm', description: 'Read 50+ books', earned: true },
    { name: '⚡ Speed Reader', description: 'Finished 5 books in a week', earned: true },
    { name: '🎯 Goal Crusher', description: 'Met annual reading goal', earned: true },
    { name: '💎 Rare Collector', description: 'Read 10 rare books', earned: true },
    { name: '🔥 Streak Master', description: '30-day reading streak', earned: false },
    { name: '🌟 Scholar', description: 'Read 100+ books', earned: false },
  ];

  return (
    <ProtectedRoute requiredPermission="view_profile">
      <div className="min-h-screen relative overflow-hidden">
        {/* Magical Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/95 to-purple-50/90" />
        </div>
        
        <ParticleBackground />
        <FloatingBooks />

        {/* Floating Achievement Icons */}
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className="fixed pointer-events-none opacity-10 z-20"
            style={{
              left: `${achievement.x}%`,
              top: `${achievement.y}%`,
              animation: `float 4s ease-in-out infinite ${achievement.id * 0.5}s`
            }}
          >
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
        ))}

        <main className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Profile Header */}
          <Card className="mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50" />
            <CardContent className="relative z-10 p-8">
              <div className="flex items-center space-x-8">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-spin opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="relative w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg animate-pulse">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                    {user.name}
                  </h2>
                  <p className="text-xl text-gray-600 mb-4">{user.email}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 text-sm px-4 py-2">
                      <Star className="w-4 h-4 mr-2" />
                      Scholar since {new Date(user.joinDate).toLocaleDateString()}
                    </Badge>
                    <Badge className={`bg-gradient-to-r ${getRoleColor(user.role)} text-white border-0 animate-pulse text-sm px-4 py-2`}>
                      <Zap className="w-4 h-4 mr-2" />
                      {getRoleDisplayName(user.role)}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 text-sm px-4 py-2">
                      <Flame className="w-4 h-4 mr-2" />
                      5 Day Streak
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <Card
                key={stat.title}
                className={`${stat.bgColor} rounded-2xl text-center transition-all duration-500 hover:scale-110 hover:rotate-2 cursor-pointer group relative overflow-hidden border-0`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:animate-bounce`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-4xl font-bold ${stat.textColor} group-hover:scale-110 transition-transform duration-300 mb-2`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${stat.textColor} font-medium`}>{stat.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Reading Goal */}
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 border-0 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center text-2xl">
                  <Target className="w-6 h-6 mr-3 text-blue-600" />
                  Reading Goal 2025
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Progress to Enlightenment</span>
                  <span className="text-lg font-bold text-blue-600">47/60 books ⚡</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-6 overflow-hidden shadow-inner mb-4">
                  <div 
                    className="h-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-1000 relative overflow-hidden" 
                    style={{ width: '78%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>🏆 13 books to Master Reader!</span>
                  <span>📅 Due: Dec 31, 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* Favorite Genre */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="w-6 h-6 mr-3 text-purple-600" />
                  Favorite Genre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl mb-4">🎭</div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">{user.favoriteGenre}</h3>
                  <p className="text-gray-600 mb-4">You've read 23 books in this genre</p>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Genre Master
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Currently Reading */}
          <Card className="mb-10 bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <BookOpen className="w-6 h-6 mr-3 text-orange-600" />
                Currently Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentBooks.map((book, index) => (
                  <div key={book.title} className="bg-white/80 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-lg mb-2">{book.title}</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-bold text-orange-600">{book.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {book.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Trophy className="w-6 h-6 mr-3 text-yellow-600" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements_list.map((achievement, index) => (
                  <div
                    key={achievement.name}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300'
                        : 'bg-gray-100 border-gray-300 opacity-60'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{achievement.name.split(' ')[0]}</div>
                      <h4 className="font-bold text-sm mb-1">{achievement.name.substring(2)}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                          Earned!
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}