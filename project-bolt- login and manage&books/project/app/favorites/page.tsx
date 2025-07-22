'use client';

import { useState, useEffect } from 'react';
import { Heart, BookOpen, Star, ArrowLeft, Search, Filter } from 'lucide-react';
import { books } from '@/lib/books';
import { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MagicBookCard from '@/components/MagicBookCard';
import BookModal from '@/components/BookModal';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingBooks from '@/components/FloatingBooks';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get favorite books (in a real app, this would come from user data)
    const favorites = books.filter(book => book.isFavorite);
    setFavoriteBooks(favorites);
    setIsLoaded(true);
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (bookId: string) => {
    setFavoriteBooks(prevBooks =>
      prevBooks.filter(book => book.id !== bookId)
    );
  };

  const handleCheckout = (bookId: string) => {
    // Handle checkout logic
    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute requiredPermission="manage_favorites">
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
              <Link href="/" className="flex items-center space-x-4 group">
                <Button variant="ghost" className="hover:scale-110 transition-transform duration-200">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Library
                </Button>
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-600 via-red-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-red-600 to-rose-600 bg-clip-text text-transparent">
                    ❤️ My Favorites
                  </h1>
                  <p className="text-gray-600 font-medium">Your beloved magical collection ✨</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white animate-pulse">
                  {favoriteBooks.length} Favorites
                </Badge>
              </div>
            </div>
          </div>

          {favoriteBooks.length === 0 ? (
            <Card className="p-16 text-center bg-gradient-to-br from-pink-50 to-red-50 border-0 shadow-xl">
              <div className="text-pink-400 mb-6">
                <Heart className="w-20 h-20 mx-auto animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-gray-600 mb-4">💔 No favorites yet</h3>
              <p className="text-gray-500 mb-6 text-lg">Start building your magical collection by adding books to your favorites!</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white px-8 py-3 text-lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Discover Books
                </Button>
              </Link>
            </Card>
          ) : (
            <>
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-0 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600 fill-current" />
                    <div className="text-3xl font-bold text-pink-700 mb-2">{favoriteBooks.length}</div>
                    <div className="text-sm text-pink-600 font-medium">Favorite Books</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <Star className="w-12 h-12 mx-auto mb-4 text-purple-600 fill-current" />
                    <div className="text-3xl font-bold text-purple-700 mb-2">
                      {(favoriteBooks.reduce((sum, book) => sum + book.rating, 0) / favoriteBooks.length).toFixed(1)}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">Average Rating</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-xl">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {favoriteBooks.filter(book => book.isAvailable).length}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">Available Now</div>
                  </CardContent>
                </Card>
              </div>

              {/* Favorites Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-pink-500 fill-current animate-pulse" />
                  Your Magical Collection
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {favoriteBooks.map((book, index) => (
                    <div
                      key={book.id}
                      className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <MagicBookCard
                        book={book}
                        onBookClick={handleBookClick}
                        onToggleFavorite={handleToggleFavorite}
                        onCheckout={handleCheckout}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>

        {/* Book Detail Modal */}
        <BookModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCheckout={handleCheckout}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </ProtectedRoute>
  );
}