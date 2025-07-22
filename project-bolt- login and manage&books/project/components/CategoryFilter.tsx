'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Category } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isOpen: boolean;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  isOpen
}: CategoryFilterProps) {
  if (!isOpen) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span>Filter by Category</span>
          <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110 ${category.color}`}>
                  {category.icon}
                </div>
                
                <div className={`font-medium text-sm mb-1 transition-colors duration-200 ${
                  selectedCategory === category.id ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {category.name}
                </div>
                
                <Badge
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  className="text-xs"
                >
                  {category.count}
                </Badge>
              </div>
              
              {/* Selection indicator */}
              {selectedCategory === category.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}