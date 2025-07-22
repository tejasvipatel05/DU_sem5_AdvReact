"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Clock, BookOpen, AlertCircle, CheckCircle, BookmarkIcon, Star, Calendar, Trash2, AreaChart as MarkAsUnread, Filter, Sparkles, Zap, Eye, EyeOff } from 'lucide-react';

interface Notification {
  id: string;
  type: 'due' | 'reserved' | 'fine' | 'returned' | 'review' | 'challenge' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

const NotificationItem = ({ notification, onMarkAsRead, onDelete }: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'due': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'reserved': return <BookmarkIcon className="w-5 h-5 text-blue-500" />;
      case 'fine': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'returned': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'review': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'challenge': return <Calendar className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEmoji = () => {
    switch (notification.type) {
      case 'due': return '⏰';
      case 'reserved': return '📖';
      case 'fine': return '💰';
      case 'returned': return '✅';
      case 'review': return '⭐';
      case 'challenge': return '🏆';
      default: return '🔔';
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50';
      case 'medium': return 'border-l-orange-500 bg-orange-50/50';
      default: return 'border-l-blue-500 bg-blue-50/50';
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-l-4 ${getPriorityColor()} ${
      !notification.isRead ? 'shadow-md' : 'opacity-75'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="mt-1 relative">
            {getIcon()}
            <span className="absolute -top-1 -right-1 text-xs">{getEmoji()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-semibold text-sm mb-1 ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                  {notification.title}
                </h3>
                <p className={`text-sm mb-2 ${!notification.isRead ? 'text-gray-700' : 'text-gray-500'}`}>
                  {notification.message}
                </p>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500 font-medium">{notification.time}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${
                      notification.priority === 'high' ? 'border-red-300 text-red-600' :
                      notification.priority === 'medium' ? 'border-orange-300 text-orange-600' :
                      'border-blue-300 text-blue-600'
                    }`}
                  >
                    {notification.priority} priority
                  </Badge>
                </div>
              </div>
              {!notification.isRead && (
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse ml-2 mt-1" />
              )}
            </div>
            <div className="flex items-center space-x-2 mt-3">
              {!notification.isRead && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Mark as Read
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(notification.id)}
                className="text-xs text-red-600 hover:bg-red-50 transition-all duration-300"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock notifications based on user role
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'due',
        title: 'Book Due Tomorrow',
        message: 'Your book "Advanced React Patterns" is due tomorrow. Please return or renew it.',
        time: '2 hours ago',
        isRead: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'reserved',
        title: 'Reserved Book Available',
        message: 'Your reserved book "Clean Architecture" is now available for pickup at Main Library.',
        time: '5 hours ago',
        isRead: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'fine',
        title: 'Late Return Fine',
        message: 'A fine of $2.50 has been applied for the late return of "JavaScript: The Good Parts".',
        time: '1 day ago',
        isRead: true,
        priority: 'medium'
      },
      {
        id: '4',
        type: 'returned',
        title: 'Book Returned Successfully',
        message: 'You have successfully returned "Design Patterns" to the Main Library.',
        time: '2 days ago',
        isRead: true,
        priority: 'low'
      },
      {
        id: '5',
        type: 'challenge',
        title: 'Reading Challenge Update',
        message: 'Congratulations! You\'ve completed 65% of your 2024 reading challenge. Keep it up!',
        time: '3 days ago',
        isRead: false,
        priority: 'low'
      },
      {
        id: '6',
        type: 'review',
        title: 'Review Reminder',
        message: 'Don\'t forget to review "Refactoring" that you recently finished reading.',
        time: '4 days ago',
        isRead: true,
        priority: 'low'
      }
    ];

    // Filter notifications based on user role
    if (user?.role === 'librarian') {
      mockNotifications.push(
        {
          id: '7',
          type: 'system',
          title: 'New Book Request',
          message: 'A student has requested "Microservices Patterns" to be added to the library collection.',
          time: '1 hour ago',
          isRead: false,
          priority: 'medium'
        },
        {
          id: '8',
          type: 'system',
          title: 'Overdue Books Alert',
          message: '15 books are currently overdue. Please follow up with borrowers.',
          time: '6 hours ago',
          isRead: false,
          priority: 'high'
        }
      );
    }

    if (user?.role === 'admin') {
      mockNotifications.push(
        {
          id: '9',
          type: 'system',
          title: 'System Maintenance',
          message: 'Scheduled system maintenance will occur this weekend from 2 AM to 6 AM.',
          time: '12 hours ago',
          isRead: false,
          priority: 'medium'
        },
        {
          id: '10',
          type: 'system',
          title: 'Monthly Report Ready',
          message: 'The monthly library usage report for January 2024 is now available.',
          time: '1 day ago',
          isRead: true,
          priority: 'low'
        }
      );
    }

    setNotifications(mockNotifications);
  }, [user]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesReadFilter = filter === 'all' || 
      (filter === 'read' && notif.isRead) || 
      (filter === 'unread' && !notif.isRead);
    
    const matchesTypeFilter = typeFilter === 'all' || notif.type === typeFilter;
    
    return matchesReadFilter && matchesTypeFilter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2">
            <Bell className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Notifications 🔔
          </h1>
          <p className="text-gray-600 text-lg">
            📬 Stay updated with your library activities
          </p>
        </div>

        {/* Stats and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{notifications.length}</div>
              <div className="text-sm text-blue-700 font-medium">Total Notifications</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">{unreadCount}</div>
              <div className="text-sm text-orange-700 font-medium">Unread Messages</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Button 
                onClick={handleMarkAllAsRead}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105 transition-all duration-300"
                disabled={unreadCount === 0}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Read ✨
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Filter className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="flex-1">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="flex items-center space-x-2">
                    <Bell className="w-4 h-4" />
                    <span>All ({notifications.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Unread ({unreadCount})</span>
                  </TabsTrigger>
                  <TabsTrigger value="read" className="flex items-center space-x-2">
                    <EyeOff className="w-4 h-4" />
                    <span>Read ({notifications.length - unreadCount})</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-colors duration-300"
              >
                <option value="all">All Types</option>
                <option value="due">📅 Due Dates</option>
                <option value="reserved">📖 Reservations</option>
                <option value="fine">💰 Fines</option>
                <option value="returned">✅ Returns</option>
                <option value="review">⭐ Reviews</option>
                <option value="challenge">🏆 Challenges</option>
                <option value="system">⚙️ System</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Notifications Found</h3>
                <p className="text-gray-500">
                  {filter === 'unread' ? 'All caught up! No unread notifications.' : 
                   filter === 'read' ? 'No read notifications to show.' : 
                   'You have no notifications at this time.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}