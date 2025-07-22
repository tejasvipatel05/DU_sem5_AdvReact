"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Star, 
  Calendar, 
  User, 
  MapPin,
  Heart,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Eye,
  TrendingUp,
  Award,
  Flame
} from 'lucide-react';

const BookCard = ({ book, onReserve, onReview }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
      case 'borrowed': return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      case 'reserved': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      case 'maintenance': return 'bg-gradient-to-r from-red-400 to-red-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-3 h-3" />;
      case 'borrowed': return <Clock className="w-3 h-3" />;
      case 'reserved': return <BookOpen className="w-3 h-3" />;
      case 'maintenance': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'available': return '✅';
      case 'borrowed': return '📖';
      case 'reserved': return '📋';
      case 'maintenance': return '🔧';
      default: return '❓';
    }
  };

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
          <BookOpen className="w-16 h-16 text-blue-500 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
          </div>
        </div>
        
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 transition-all duration-300 ${
              isLiked ? 'fill-red-500 text-red-500 scale-125' : 'text-gray-600'
            }`} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
        
        <div className="absolute bottom-3 left-3">
          <Badge className={`${getStatusColor(book.status)} flex items-center space-x-1 animate-pulse hover:animate-none transition-all duration-300`}>
            {getStatusIcon(book.status)}
            <span className="capitalize">{book.status}</span>
            <span>{getStatusEmoji(book.status)}</span>
          </Badge>
        </div>

        {/* Trending indicator */}
        {book.rating > 4.5 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-bounce">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot 🔥
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 relative">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-3 flex items-center">
          <User className="w-4 h-4 mr-1" />
          {book.author}
        </p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all duration-300 ${
                  i < Math.floor(book.rating) 
                    ? 'fill-yellow-400 text-yellow-400 scale-110' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2 font-medium">
            ({book.reviews} reviews) ⭐
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
            <MapPin className="w-4 h-4 mr-1" />
            {book.branch} 📍
          </span>
          <span className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
            <Calendar className="w-4 h-4 mr-1" />
            {book.publishYear} 📅
          </span>
        </div>

        <div className="flex space-x-2">
          {book.status === 'available' ? (
            <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-300 shadow-lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              Borrow Now ✨
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300"
              onClick={() => onReserve(book.id)}
            >
              <Clock className="w-4 h-4 mr-2" />
              Reserve 📋
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-yellow-50 hover:border-yellow-300 hover:scale-110 transition-all duration-300"
            onClick={() => onReview(book.id)}
          >
            <Star className="w-4 h-4" />
          </Button>
        </div>

        {/* Popularity indicator */}
        {book.reviews > 100 && (
          <div className="mt-3 flex items-center justify-center">
            <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <Flame className="w-3 h-3 mr-1 text-orange-500" />
              Popular Choice 🌟
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FilterPanel = ({ filters, onFilterChange }) => (
  <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 relative overflow-hidden">
    <div className="absolute top-2 right-2">
      <Filter className="w-5 h-5 text-blue-400 animate-pulse" />
    </div>
    <h3 className="font-bold mb-4 text-lg flex items-center">
      <Filter className="w-5 h-5 mr-2 text-blue-500" />
      Filters 🎯
    </h3>
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold mb-3 block text-gray-700">📚 Category</label>
        <Select onValueChange={(value) => onFilterChange('category', value)}>
          <SelectTrigger className="hover:border-blue-300 transition-colors duration-300">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fiction">📖 Fiction</SelectItem>
            <SelectItem value="non-fiction">📰 Non-Fiction</SelectItem>
            <SelectItem value="science">🔬 Science</SelectItem>
            <SelectItem value="technology">💻 Technology</SelectItem>
            <SelectItem value="history">🏛️ History</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-semibold mb-3 block text-gray-700">📊 Status</label>
        <Select onValueChange={(value) => onFilterChange('status', value)}>
          <SelectTrigger className="hover:border-blue-300 transition-colors duration-300">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">✅ Available</SelectItem>
            <SelectItem value="borrowed">📖 Borrowed</SelectItem>
            <SelectItem value="reserved">📋 Reserved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-semibold mb-3 block text-gray-700">📍 Branch</label>
        <Select onValueChange={(value) => onFilterChange('branch', value)}>
          <SelectTrigger className="hover:border-blue-300 transition-colors duration-300">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="main">🏢 Main Library</SelectItem>
            <SelectItem value="north">🧭 North Branch</SelectItem>
            <SelectItem value="south">🗺️ South Branch</SelectItem>
            <SelectItem value="east">🌅 East Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-semibold mb-3 block text-gray-700">⭐ Rating</label>
        <Select onValueChange={(value) => onFilterChange('rating', value)}>
          <SelectTrigger className="hover:border-blue-300 transition-colors duration-300">
            <SelectValue placeholder="Any Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Rating</SelectItem>
            <SelectItem value="4+">⭐⭐⭐⭐ 4+ Stars</SelectItem>
            <SelectItem value="3+">⭐⭐⭐ 3+ Stars</SelectItem>
            <SelectItem value="2+">⭐⭐ 2+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </Card>
);

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  
  // Mock data with enhanced properties
  const mockBooks = [
    {
      id: 1,
      title: "Advanced React Patterns",
      author: "Kent C. Dodds",
      rating: 4.8,
      reviews: 156,
      status: "available",
      branch: "Main Library",
      publishYear: "2023",
      category: "Technology"
    },
    {
      id: 2,
      title: "Clean Architecture",
      author: "Robert C. Martin",
      rating: 4.6,
      reviews: 243,
      status: "borrowed",
      branch: "North Branch",
      publishYear: "2017",
      category: "Technology"
    },
    {
      id: 3,
      title: "The Psychology of Programming",
      author: "Gerald Weinberg",
      rating: 4.4,
      reviews: 89,
      status: "available",
      branch: "Main Library",
      publishYear: "1998",
      category: "Technology"
    },
    {
      id: 4,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      rating: 4.7,
      reviews: 1205,
      status: "reserved",
      branch: "South Branch",
      publishYear: "2011",
      category: "History"
    },
    {
      id: 5,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      rating: 4.5,
      reviews: 890,
      status: "available",
      branch: "East Branch",
      publishYear: "2011",
      category: "Science"
    },
    {
      id: 6,
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      rating: 4.9,
      reviews: 445,
      status: "available",
      branch: "Main Library",
      publishYear: "1999",
      category: "Technology"
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleReserve = (bookId) => {
    console.log('Reserving book:', bookId);
  };

  const handleReview = (bookId) => {
    console.log('Reviewing book:', bookId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8 relative">
          <div className="absolute -top-2 -left-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Library Catalog 📚
          </h1>
          <p className="text-xl text-gray-600">
            🚀 Discover your next great read from our collection
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  placeholder="🔍 Search by title, author, ISBN, or keyword..."
                  className="pl-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-2 hover:border-blue-300 transition-colors duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">📝 Sort by Title</SelectItem>
                  <SelectItem value="author">👤 Sort by Author</SelectItem>
                  <SelectItem value="rating">⭐ Sort by Rating</SelectItem>
                  <SelectItem value="date">📅 Sort by Date</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:border-blue-300 hover:scale-110 transition-all duration-300">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Enhanced Books Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 font-medium">
                📊 Showing <span className="font-bold text-blue-600">{mockBooks.length}</span> books
              </p>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Live results</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {mockBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onReserve={handleReserve}
                  onReview={handleReview}
                />
              ))}
            </div>

            {/* Enhanced Load More */}
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                variant="outline" 
                className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-medium"
              >
                <Zap className="w-5 h-5 mr-2" />
                Load More Books ✨
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}