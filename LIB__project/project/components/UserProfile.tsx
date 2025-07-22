'use client';

import { useState } from 'react';
import { BookOpen, Heart, Clock, TrendingUp, Settings, Bell } from 'lucide-react';
import { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`transition-all duration-500 ${isExpanded ? 'col-span-full' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">{user.name}</CardTitle>
              <p className="text-gray-600">{user.email}</p>
              <Badge variant="secondary" className="mt-1">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{user.booksRead}</div>
            <div className="text-sm text-blue-600">Books Read</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{user.booksCheckedOut}</div>
            <div className="text-sm text-orange-600">Checked Out</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">23</div>
            <div className="text-sm text-green-600">Favorites</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">12</div>
            <div className="text-sm text-purple-600">This Month</div>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-300 space-y-4">
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Favorite Genre</h4>
              <Badge variant="outline" className="text-sm">
                {user.favoriteGenre}
              </Badge>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Reading Goal 2025</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium">47/60 books</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}