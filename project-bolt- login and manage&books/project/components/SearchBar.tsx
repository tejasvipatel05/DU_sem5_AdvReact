'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
  isFilterOpen: boolean;
}

export default function SearchBar({ onSearch, onFilterToggle, isFilterOpen }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, onSearch]);

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${
        isFocused ? 'scale-[1.02] shadow-lg' : 'shadow-md'
      }`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors duration-200 ${
            isFocused ? 'text-blue-500' : 'text-gray-400'
          }`} />
        </div>
        
        <Input
          type="text"
          placeholder="Search books, authors, or ISBN..."
          className="w-full pl-12 pr-20 py-3 text-lg border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:bg-white transition-all duration-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          <Button
            variant={isFilterOpen ? "default" : "outline"}
            size="sm"
            onClick={onFilterToggle}
            className={`transition-all duration-200 ${
              isFilterOpen 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'hover:bg-gray-50 border-gray-300'
            }`}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search suggestions/results indicator */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="text-sm text-gray-600">
            Searching for "<span className="font-medium text-gray-900">{searchQuery}</span>"
          </div>
        </div>
      )}
    </div>
  );
}