import { Link } from 'react-router-dom';
import { Watch, ShoppingBag, Footprints, Glasses, Smartphone, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categoryData = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: ShoppingBag,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Glasses,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
  {
    id: 'footwear',
    name: 'Footwear',
    icon: Footprints,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: Headphones,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
  {
    id: 'watches',
    name: 'Watches',
    icon: Watch,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  },
];

export function CategoryGrid() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-6 lg:px-8 pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Row Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categoryData.slice(0, 3).map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group"
              >
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <Icon className="h-6 w-6 text-shop-primary" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((item, index) => (
                        <div key={index} className="bg-gray-200 h-16 rounded flex items-center justify-center">
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-sm text-shop-primary font-medium group-hover:underline">
                        Link
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Trending Section */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending</h3>
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="flex-shrink-0 bg-gray-200 w-20 h-20 rounded flex items-center justify-center">
                  <span className="text-sm text-gray-600">Item {index + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Row Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryData.slice(3, 6).map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group"
              >
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <Icon className="h-6 w-6 text-shop-primary" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((item, index) => (
                        <div key={index} className="bg-gray-200 h-16 rounded flex items-center justify-center">
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-sm text-shop-primary font-medium group-hover:underline">
                        Link
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}