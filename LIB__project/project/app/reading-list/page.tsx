'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Clock, Star, ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { books } from '@/lib/books';
import { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MagicBookCard from '@/components/MagicBookCard';
import BookModal from '@/components/BookModal';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingBooks from '@/components/FloatingBooks';
import Link from 'next/link';

export default function ReadingListPage() {
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get books that are checked out or have reading progress
    const currentlyReading = books.filter(book => !book.isAvailable || book.readingProgress);
    setReadingList(currentlyReading);
    setIsLoaded(true);
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (bookId: string) => {
    setReadingList(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  const handleCheckout = (bookId: string) => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/95 to-purple-50/90" />
      </div>
      
      <ParticleBackground />
      <FloatingBooks />

      {/* Header */}
      <header className="relative z-30 bg-white/80 backdrop-blur-xl border-b border-white/30 sticky top-0 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 group">
              <Button variant="ghost" className="hover:scale-110 transition-transform duration-200">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Library
              </Button>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  📖 My Reading List
                </h1>
                <p className="text-gray-600 font-medium">Your current magical journey 🌟</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse">
                {readingList.length} Books
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {readingList.length === 0 ? (
          <Card className="p-16 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
            <div className="text-green-400 mb-6">
              <BookOpen className="w-20 h-20 mx-auto animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">📚 No books in your reading list</h3>
            <p className="text-gray-500 mb-6 text-lg">Start your reading journey by checking out some magical books!</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Books
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <div className="text-3xl font-bold text-green-700 mb-2">{readingList.length}</div>
                  <div className="text-sm text-green-600 font-medium">Total Books</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    {readingList.filter(book => book.readingProgress && book.readingProgress > 0).length}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">In Progress</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    {Math.round(readingList.reduce((sum, book) => sum + (book.readingProgress || 0), 0) / readingList.length) || 0}%
                  </div>
                  <div className="text-sm text-purple-600 font-medium">Avg Progress</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-xl">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <div className="text-3xl font-bold text-orange-700 mb-2">
                    {readingList.filter(book => book.dueDate).length}
                  </div>
                  <div className="text-sm text-orange-600 font-medium">Due Soon</div>
                </CardContent>
              </Card>
            </div>

            {/* Reading List Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-green-500 animate-pulse" />
                Your Current Reading Journey
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {readingList.map((book, index) => (
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
  );
}