"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Award, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Star,
  Trophy,
  Flame,
  Clock,
  Users,
  Sparkles,
  Zap,
  Heart,
  Crown,
  Medal,
  Gift
} from 'lucide-react';

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

const AchievementBadge = ({ icon: Icon, title, description, earned = false, date = null, rarity = "common" }) => {
  const getRarityColor = () => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic': return 'from-purple-400 via-pink-500 to-red-500';
      case 'rare': return 'from-blue-400 via-purple-500 to-pink-500';
      default: return 'from-green-400 to-blue-500';
    }
  };

  const getRarityEmoji = () => {
    switch (rarity) {
      case 'legendary': return '🏆';
      case 'epic': return '💎';
      case 'rare': return '⭐';
      default: return '🎖️';
    }
  };

  return (
    <Card className={`${
      earned 
        ? `bg-gradient-to-br ${getRarityColor()} text-white shadow-xl border-0` 
        : 'bg-gray-50 border-gray-200'
    } transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden`}>
      {earned && (
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      )}
      <div className="absolute top-2 right-2">
        {earned ? (
          <div className="text-xl animate-bounce">{getRarityEmoji()}</div>
        ) : (
          <div className="text-gray-400">🔒</div>
        )}
      </div>
      <CardContent className="p-4 text-center relative z-10">
        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
          earned 
            ? 'bg-white/20 backdrop-blur-sm' 
            : 'bg-gray-300'
        } transition-all duration-300 hover:scale-110`}>
          <Icon className={`w-8 h-8 ${earned ? 'text-white' : 'text-gray-500'}`} />
        </div>
        <h3 className={`font-bold mb-1 ${earned ? 'text-white' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className={`text-xs mb-2 ${earned ? 'text-white/90' : 'text-gray-500'}`}>
          {description}
        </p>
        {earned && date && (
          <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
            Earned {date} ✨
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

const BookCard = ({ book, rank }) => (
  <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 relative overflow-hidden">
    <div className="absolute top-2 right-2">
      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-pulse">
        #{rank} 🏆
      </Badge>
    </div>
    <CardContent className="p-4">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-16 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded flex items-center justify-center flex-shrink-0 relative">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <div className="absolute -top-1 -right-1">
            <Heart className="w-3 h-3 text-pink-400" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 hover:text-blue-600 transition-colors duration-300">{book.title}</h3>
          <p className="text-xs text-gray-600 mb-2">{book.author}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 transition-all duration-300 ${
                    i < book.rating 
                      ? 'fill-yellow-400 text-yellow-400 scale-110' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-2 py-1 rounded-lg">
            📅 Completed on {book.completedDate}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const LeaderboardItem = ({ user, rank, isCurrentUser = false }) => {
  const getRankColor = () => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-orange-500';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-purple-600';
    }
  };

  const getRankEmoji = () => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
      isCurrentUser 
        ? 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 shadow-lg' 
        : 'hover:bg-gray-50'
    }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-gradient-to-r ${getRankColor()} text-white shadow-lg relative`}>
        {rank <= 3 ? (
          <div className="text-lg">{getRankEmoji()}</div>
        ) : (
          <span>{rank}</span>
        )}
        {rank === 1 && (
          <div className="absolute -top-1 -right-1">
            <Crown className="w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className={`font-bold ${isCurrentUser ? 'text-blue-800' : 'text-gray-800'}`}>
            {user.name} {isCurrentUser && '(You) 🎯'}
          </p>
          {user.streak > 0 && (
            <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded-lg">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span className="text-xs text-orange-600 font-bold">{user.streak} day streak 🔥</span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 font-medium">{user.branch}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {user.booksRead}
        </p>
        <p className="text-xs text-gray-500 font-medium">books 📚</p>
      </div>
    </div>
  );
};

export default function ReadingChallenge() {
  const [currentUser] = useState({
    name: "Alex Johnson",
    booksRead: 13,
    target: 20,
    rank: 12,
    streak: 5,
    points: 285
  });

  const [readingStats, setReadingStats] = useState({
    totalPages: 3240,
    averageRating: 4.2,
    favoriteGenre: "Technology",
    readingTime: "45 hrs"
  });

  // Mock data with enhanced achievements
  const achievements = [
    { icon: BookOpen, title: "First Book", description: "Complete your first book", earned: true, date: "Jan 5", rarity: "common" },
    { icon: Flame, title: "Week Warrior", description: "Read for 7 days straight", earned: true, date: "Jan 12", rarity: "rare" },
    { icon: Star, title: "5-Star Fan", description: "Give 5 books a 5-star rating", earned: false, rarity: "epic" },
    { icon: Calendar, title: "Monthly Master", description: "Read 5 books in one month", earned: true, date: "Jan 30", rarity: "rare" },
    { icon: Trophy, title: "Speed Reader", description: "Read 3 books in one week", earned: false, rarity: "legendary" },
    { icon: Award, title: "Genre Explorer", description: "Read books from 5 different genres", earned: false, rarity: "epic" }
  ];

  const recentBooks = [
    { title: "Advanced React Patterns", author: "Kent C. Dodds", rating: 5, completedDate: "Jan 8", rank: 13 },
    { title: "Clean Architecture", author: "Robert Martin", rating: 4, completedDate: "Jan 5", rank: 12 },
    { title: "Design Patterns", author: "Gang of Four", rating: 5, completedDate: "Jan 2", rank: 11 },
    { title: "Refactoring", author: "Martin Fowler", rating: 4, completedDate: "Dec 28", rank: 10 }
  ];

  const leaderboard = [
    { name: "Sarah Chen", booksRead: 28, streak: 12, branch: "Computer Science" },
    { name: "Michael Rodriguez", booksRead: 25, streak: 8, branch: "Engineering" },
    { name: "Emily Johnson", booksRead: 23, streak: 0, branch: "Literature" },
    { name: "David Kim", booksRead: 21, streak: 15, branch: "Physics" },
    { name: "Jessica Brown", booksRead: 19, streak: 3, branch: "Mathematics" },
    { name: "Alex Johnson", booksRead: 13, streak: 5, branch: "Computer Science" }
  ];

  const progress = (currentUser.booksRead / currentUser.target) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2">
            <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            2024 Reading Challenge 🏆
          </h1>
          <p className="text-gray-600 text-lg">
            📊 Track your reading progress and compete with fellow students
          </p>
        </div>

        {/* Enhanced Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex space-x-2">
                <Target className="w-6 h-6 text-blue-500 animate-pulse" />
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Target className="w-7 h-7 text-blue-500" />
                  <span>Challenge Progress 🎯</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      <AnimatedCounter end={currentUser.booksRead} />
                    </div>
                    <div className="text-xl text-gray-600 font-medium">
                      of {currentUser.target} books read 📚
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Progress: {currentUser.booksRead}/{currentUser.target} 📖</span>
                      <span className="text-blue-600">{progress.toFixed(1)}% complete ✨</span>
                    </div>
                    <div className="relative">
                      <Progress value={progress} className="w-full h-4 bg-gray-200" />
                      <div 
                        className="absolute top-0 left-0 h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ width: `${progress}%` }}
                      >
                        {progress > 20 && <Zap className="w-3 h-3 text-white animate-pulse" />}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <p className="text-3xl font-bold text-green-600">
                        <AnimatedCounter end={currentUser.target - currentUser.booksRead} />
                      </p>
                      <p className="text-sm text-gray-600 font-medium">books to goal 🎯</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <p className="text-3xl font-bold text-purple-600">
                        #<AnimatedCounter end={currentUser.rank} />
                      </p>
                      <p className="text-sm text-gray-600 font-medium">current rank 🏆</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <TrendingUp className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Reading Stats 📊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                  <span className="text-gray-600 font-medium">📄 Total Pages</span>
                  <span className="font-bold text-blue-600">
                    <AnimatedCounter end={readingStats.totalPages} />
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                  <span className="text-gray-600 font-medium">⭐ Avg Rating</span>
                  <span className="font-bold text-green-600">{readingStats.averageRating}/5.0</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                  <span className="text-gray-600 font-medium">📚 Favorite Genre</span>
                  <span className="font-bold text-purple-600">{readingStats.favoriteGenre}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-pink-50 rounded-lg">
                  <span className="text-gray-600 font-medium">⏱️ Reading Time</span>
                  <span className="font-bold text-pink-600">{readingStats.readingTime}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span>Current Streak 🔥</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    <AnimatedCounter end={currentUser.streak} />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">days in a row 🎯</div>
                  <div className="mt-3 p-2 bg-orange-100 rounded-lg">
                    <p className="text-xs text-orange-700 font-medium">
                      🎉 Keep it up! You're on fire!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Achievements */}
        <Card className="mb-8 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Medal className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-7 h-7 text-yellow-500" />
              <span>Achievements 🏆</span>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse">
                {achievements.filter(a => a.earned).length}/{achievements.length} ✨
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement, index) => (
                <AchievementBadge key={index} {...achievement} />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Recent Books */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <BookOpen className="w-5 h-5 text-blue-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span>Recently Completed 📚</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <BookCard key={index} book={book} rank={book.rank} />
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300">
                <Gift className="w-4 h-4 mr-2" />
                View All Books ✨
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Leaderboard */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Crown className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span>Leaderboard 🏆</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <LeaderboardItem 
                    key={index} 
                    user={user} 
                    rank={index + 1}
                    isCurrentUser={user.name === currentUser.name}
                  />
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 hover:bg-yellow-50 hover:border-yellow-300 hover:scale-105 transition-all duration-300">
                <Crown className="w-4 h-4 mr-2" />
                View Full Leaderboard 👑
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}