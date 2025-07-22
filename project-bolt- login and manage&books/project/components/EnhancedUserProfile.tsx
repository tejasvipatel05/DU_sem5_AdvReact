'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Heart, Clock, TrendingUp, Settings, Bell, Award, Zap, Star, Crown } from 'lucide-react';
import { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EnhancedUserProfileProps {
  user: User;
}

export default function EnhancedUserProfile({ user }: EnhancedUserProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [achievements, setAchievements] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const newAchievements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setAchievements(newAchievements);
  }, []);

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

  return (
    <Card className={`relative overflow-hidden transition-all duration-700 hover:shadow-2xl ${
      isExpanded ? 'col-span-full' : ''
    }`}>
      {/* Floating Achievement Icons */}
      {achievements.map(achievement => (
        <div
          key={achievement.id}
          className="absolute pointer-events-none opacity-10"
          style={{
            left: `${achievement.x}%`,
            top: `${achievement.y}%`,
            animation: `float 4s ease-in-out infinite ${achievement.id * 0.5}s`
          }}
        >
          <Award className="w-6 h-6 text-yellow-500" />
        </div>
      ))}

      <CardHeader className="pb-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-spin opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={user.avatar}
                alt={user.name}
                className="relative w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-xl transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg animate-pulse">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {user.name}
              </CardTitle>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                  <Star className="w-3 h-3 mr-1" />
                  Scholar since {new Date(user.joinDate).toLocaleDateString()}
                </Badge>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 animate-pulse">
                  <Zap className="w-3 h-3 mr-1" />
                  Level 5 Reader
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
              <Bell className="w-5 h-5 text-blue-500" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
              <Settings className="w-5 h-5 text-gray-500" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:scale-105 transition-all duration-200"
            >
              {isExpanded ? '✨ Collapse' : '🔮 Expand Magic'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`${stat.bgColor} rounded-2xl p-6 text-center transition-all duration-500 hover:scale-110 hover:rotate-2 cursor-pointer group relative overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Magical Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:animate-bounce`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-3xl font-bold ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${stat.textColor} font-medium`}>{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-4 duration-500 space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Favorite Genre
              </h4>
              <Badge variant="outline" className="text-sm bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                🎭 {user.favoriteGenre}
              </Badge>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Reading Goal 2025
                </h4>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Progress to Enlightenment</span>
                  <span className="text-sm font-bold text-blue-600">47/60 books ⚡</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-1000 relative overflow-hidden" 
                    style={{ width: '78%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600 flex items-center justify-between">
                  <span>🏆 13 books to Master Reader!</span>
                  <span>🔥 5 day streak</span>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
              <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-600" />
                Recent Achievements
              </h4>
              <div className="flex flex-wrap gap-3">
                {['📚 Bookworm', '⚡ Speed Reader', '🎯 Goal Crusher', '💎 Rare Collector'].map((achievement, index) => (
                  <Badge 
                    key={achievement}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 hover:scale-110 transition-transform duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Card>
  );
}