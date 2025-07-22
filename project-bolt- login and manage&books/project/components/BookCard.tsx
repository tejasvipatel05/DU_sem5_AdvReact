'use client';

import { useState } from 'react';
import { Heart, BookOpen, Calendar, Star, User } from 'lucide-react';
import { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
  onBookClick: (book: Book) => void;
  onToggleFavorite: (bookId: string) => void;
  onCheckout: (bookId: string) => void;
}

export default function BookCard({ book, onBookClick, onToggleFavorite, onCheckout }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
        isHovered ? 'scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onBookClick(book)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={book.isAvailable ? "default" : "destructive"} className="text-xs">
            {book.isAvailable ? 'Available' : 'Checked Out'}
          </Badge>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            book.isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${book.isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions */}
        <div className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {book.isAvailable && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onCheckout(book.id);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Checkout
            </Button>
          )}
          {!book.isAvailable && book.dueDate && (
            <div className="flex-1 bg-orange-100 text-orange-700 px-3 py-2 rounded-md text-xs font-medium flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Due {book.dueDate}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <User className="w-4 h-4 mr-1" />
          <span className="text-sm">{book.author}</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {book.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-700">{book.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({book.totalRatings})</span>
          </div>
          
          <div className="text-sm text-gray-500">
            {book.pages} pages
          </div>
        </div>

        {/* Reading Progress */}
        {book.readingProgress && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Reading Progress</span>
              <span className="text-xs font-medium text-blue-600">{book.readingProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${book.readingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}