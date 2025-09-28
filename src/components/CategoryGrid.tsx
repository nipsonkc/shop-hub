import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CategoryGrid() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-8">
        {/* Top Row Categories */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['Category 1', 'Category 2', 'Category 3'].map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-gray-200 h-12 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">Item</span>
                  </div>
                ))}
              </div>
              <Link to={`/category/${index + 1}`} className="text-blue-500 text-sm hover:underline">
                Link
              </Link>
            </div>
          ))}
        </div>

        {/* Trending Section */}
        <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Trending</h3>
            <div className="flex gap-2">
              <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex-shrink-0 bg-gray-200 w-16 h-16 rounded flex flex-col items-center justify-center">
                <span className="text-xs text-gray-600">Item {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row Categories */}
        <div className="grid grid-cols-3 gap-4">
          {['Category 4', 'Category 5', 'Category 6'].map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-gray-200 h-12 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">Item</span>
                  </div>
                ))}
              </div>
              <Link to={`/category/${index + 4}`} className="text-blue-500 text-sm hover:underline">
                Link
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}