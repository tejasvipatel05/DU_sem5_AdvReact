"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  Bell, 
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  BookmarkIcon,
  Target,
  Sparkles,
  Zap,
  Heart,
  Flame,
  Trophy,
  Settings,
  Eye,
  BarChart3
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

// Remove the RoleSelector component as we now use real authentication

const QuickAction = ({ icon: Icon, title, description, color = "blue", onClick, emoji }) => (
  <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:rotate-1 relative overflow-hidden" onClick={onClick}>
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <Zap className={`w-4 h-4 text-${color}-400 animate-pulse`} />
    </div>
    <CardContent className="p-6 relative z-10">
      <div className="flex items-center space-x-4">
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-${color}-400 to-${color}-600 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg relative`}>
          <Icon className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 text-lg">{emoji}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-lg">{title}</h3>
          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
        </div>
      </div>
      <div className={`mt-4 h-1 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </CardContent>
  </Card>
);

const NotificationItem = ({ type, message, time, isNew = false }) => {
  const getIcon = () => {
    switch (type) {
      case 'due': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'reserved': return <BookmarkIcon className="w-5 h-5 text-blue-500" />;
      case 'fine': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'returned': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEmoji = () => {
    switch (type) {
      case 'due': return '⏰';
      case 'reserved': return '📖';
      case 'fine': return '💰';
      case 'returned': return '✅';
      default: return '🔔';
    }
  };

  return (
    <div className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
      isNew 
        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500 shadow-md' 
        : 'hover:bg-gray-50'
    }`}>
      <div className="mt-1 relative">
        {getIcon()}
        <span className="absolute -top-1 -right-1 text-xs">{getEmoji()}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800 font-medium">{message}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      {isNew && (
        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-pulse">
          New ✨
        </Badge>
      )}
    </div>
  );
};

const BookCard = ({ title, author, dueDate, status, cover }) => (
  <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:rotate-1">
    <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center relative">
      <BookOpen className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute top-2 right-2">
        <Heart className="w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
      <p className="text-xs text-gray-600 mb-2">{author}</p>
      <div className="flex items-center justify-between">
        <Badge 
          variant={status === 'due_soon' ? 'destructive' : 'secondary'} 
          className={`text-xs transition-all duration-300 ${
            status === 'due_soon' 
              ? 'animate-pulse bg-gradient-to-r from-red-500 to-orange-500' 
              : 'bg-gradient-to-r from-green-500 to-blue-500'
          }`}
        >
          {status === 'due_soon' ? '⚠️ Due Soon' : '✅ Active'}
        </Badge>
        <span className="text-xs text-gray-500 font-medium">{dueDate}</span>
      </div>
    </CardContent>
  </Card>
);

const StatCard = ({ icon: Icon, title, value, color, emoji }) => (
  <Card className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 relative overflow-hidden`}>
    <div className="absolute top-2 right-2 text-2xl animate-bounce">{emoji}</div>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm text-${color}-600 font-medium`}>{title}</p>
          <p className={`text-3xl font-bold text-${color}-700`}>
            <AnimatedCounter end={parseInt(value)} />
          </p>
        </div>
        <div className={`p-3 rounded-2xl bg-gradient-to-br from-${color}-400 to-${color}-600 text-white shadow-lg`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const { user, hasRole } = useAuth();
  const [readingProgress, setReadingProgress] = useState(65);

  const mockNotifications = [
    { type: 'due', message: 'Book "Advanced React Patterns" is due tomorrow', time: '2 hours ago', isNew: true },
    { type: 'reserved', message: 'Your reserved book "Clean Code" is now available', time: '5 hours ago', isNew: true },
    { type: 'fine', message: 'Fine of $2.50 applied for late return', time: '1 day ago', isNew: false },
    { type: 'returned', message: 'Successfully returned "JavaScript: The Good Parts"', time: '2 days ago', isNew: false },
  ];

  const mockBorrowedBooks = [
    { title: 'Advanced React Patterns', author: 'Kent C. Dodds', dueDate: 'Jan 15', status: 'due_soon' },
    { title: 'Clean Architecture', author: 'Robert Martin', dueDate: 'Jan 20', status: 'active' },
    { title: 'Design Patterns', author: 'Gang of Four', dueDate: 'Jan 25', status: 'active' },
    { title: 'Refactoring', author: 'Martin Fowler', dueDate: 'Jan 28', status: 'active' },
  ];

  const renderStudentDashboard = () => (
    <div className="space-y-8">
      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={BookOpen}
          title="Books Borrowed"
          value="4"
          color="blue"
          emoji="📚"
        />
        <StatCard
          icon={Star}
          title="Reading Points"
          value="285"
          color="green"
          emoji="⭐"
        />
        <StatCard
          icon={Award}
          title="Current Rank"
          value="12"
          color="purple"
          emoji="🏆"
        />
      </div>

      {/* Enhanced Reading Challenge */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <div className="flex space-x-2">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            <Target className="w-5 h-5 text-blue-500 animate-bounce" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <Target className="w-6 h-6 text-blue-500" />
            <span>2024 Reading Challenge 🎯</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress: 13/20 books 📖</span>
              <span className="text-blue-600">{readingProgress}% complete ✨</span>
            </div>
            <div className="relative">
              <Progress value={readingProgress} className="w-full h-4 bg-gray-200" />
              <div className="absolute top-0 left-0 h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000" 
                   style={{ width: `${readingProgress}%` }} />
            </div>
            <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
              🎉 Great job! You're ahead of schedule. 7 more books to reach your goal! 🚀
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Current Books */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <BookOpen className="w-5 h-5 text-blue-500 animate-pulse" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span>My Books 📚</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {mockBorrowedBooks.map((book, index) => (
                <BookCard key={index} {...book} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Notifications */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Bell className="w-5 h-5 text-purple-500 animate-pulse" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-6 h-6 text-purple-500" />
              <span>Notifications 🔔</span>
              <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
                4 ✨
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {mockNotifications.map((notification, index) => (
                <NotificationItem key={index} {...notification} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLibrarianDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={BookOpen} title="Total Books" value="1247" color="blue" emoji="📚" />
        <StatCard icon={Users} title="Active Borrowers" value="89" color="green" emoji="👥" />
        <StatCard icon={Clock} title="Overdue Books" value="15" color="orange" emoji="⏰" />
        <StatCard icon={BookmarkIcon} title="Reservations" value="23" color="purple" emoji="📖" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickAction
          icon={BookOpen}
          title="Manage Books"
          description="Add, edit, or remove books"
          color="blue"
          emoji="📚"
        />
        <QuickAction
          icon={Users}
          title="Check Out Book"
          description="Process book borrowing"
          color="green"
          emoji="✅"
        />
        <QuickAction
          icon={Calendar}
          title="View Returns"
          description="Process book returns"
          color="purple"
          emoji="📅"
        />
        <QuickAction
          icon={AlertCircle}
          title="Overdue Items"
          description="Manage overdue books"
          color="orange"
          emoji="⚠️"
        />
        <QuickAction
          icon={BookmarkIcon}
          title="Reservations"
          description="Handle book reservations"
          color="indigo"
          emoji="📖"
        />
        <QuickAction
          icon={BarChart3}
          title="Reports"
          description="View library statistics"
          color="pink"
          emoji="📊"
        />
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Total Users" value="324" color="blue" emoji="👥" />
        <StatCard icon={BookOpen} title="Total Collection" value="12456" color="green" emoji="📚" />
        <StatCard icon={TrendingUp} title="System Uptime" value="94" color="purple" emoji="📈" />
        <StatCard icon={Award} title="Monthly Revenue" value="2450" color="pink" emoji="💰" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickAction
          icon={Users}
          title="User Management"
          description="Manage all system users"
          color="blue"
          emoji="👥"
        />
        <QuickAction
          icon={BookOpen}
          title="Inventory Management"
          description="Manage book inventory"
          color="green"
          emoji="📦"
        />
        <QuickAction
          icon={TrendingUp}
          title="Analytics"
          description="View detailed reports"
          color="purple"
          emoji="📊"
        />
        <QuickAction
          icon={Settings}
          title="System Settings"
          description="Configure system parameters"
          color="orange"
          emoji="⚙️"
        />
        <QuickAction
          icon={Star}
          title="Branch Management"
          description="Manage library branches"
          color="indigo"
          emoji="🏢"
        />
        <QuickAction
          icon={Eye}
          title="System Logs"
          description="View system activities"
          color="pink"
          emoji="👁️"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name} {user?.role === 'student' ? '🎓' : user?.role === 'librarian' ? '📚' : '👑'}!
          </h1>
          <p className="text-gray-600 text-lg">
            {user?.role === 'student' 
              ? '🚀 Ready to discover your next great read?' 
              : user?.role === 'librarian'
              ? '📊 Here\'s what\'s happening in your library today.'
              : '🎛️ System overview and management tools are ready.'}
          </p>
        </div>

        {user?.role === 'student' && renderStudentDashboard()}
        {user?.role === 'librarian' && renderLibrarianDashboard()}
        {user?.role === 'admin' && renderAdminDashboard()}
      </div>
    </div>
  );
}