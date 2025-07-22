'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, BookOpen, Star, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { books as initialBooks } from '@/lib/books';
import { Book } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingBooks from '@/components/FloatingBooks';

export default function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDeleteBook = (bookId: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
  };

  const stats = [
    { title: 'Total Books', value: books.length, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { title: 'Available', value: books.filter(b => b.isAvailable).length, icon: Star, color: 'from-green-500 to-emerald-500' },
    { title: 'Checked Out', value: books.filter(b => !b.isAvailable).length, icon: Calendar, color: 'from-orange-500 to-red-500' },
    { title: 'Categories', value: new Set(books.map(b => b.category)).size, icon: Filter, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <ProtectedRoute requiredPermission="manage_books">
      <div className="min-h-screen relative overflow-hidden">
        {/* Magical Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/95 to-purple-50/90" />
        </div>
        
        <ParticleBackground />
        <FloatingBooks />

        <main className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  📚 Manage Books
                </h1>
                <p className="text-gray-600 text-lg">Add, edit, and organize your magical collection</p>
              </div>
              
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Plus className="w-5 h-5 mr-2" />
                Add New Book
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.title}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:animate-bounce`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search books, authors, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm min-w-[200px]"
              >
                <option value="all">All Categories</option>
                <option value="fiction">Fiction</option>
                <option value="science">Science</option>
                <option value="technology">Technology</option>
                <option value="history">History</option>
                <option value="arts">Arts</option>
              </select>
            </div>
          </div>

          {/* Books Table */}
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                Books Collection ({filteredBooks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Book</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Author</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Category</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Status</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Rating</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book, index) => (
                      <tr 
                        key={book.id} 
                        className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={book.coverUrl} 
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded-lg shadow-md"
                            />
                            <div>
                              <h3 className="font-bold text-gray-900 line-clamp-1">{book.title}</h3>
                              <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-gray-900">{book.author}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="capitalize">
                            {book.category}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={book.isAvailable ? "default" : "destructive"}>
                            {book.isAvailable ? '✅ Available' : '🔒 Checked Out'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{book.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({book.totalRatings})</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-red-50 hover:border-red-300 text-red-600"
                              onClick={() => handleDeleteBook(book.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}