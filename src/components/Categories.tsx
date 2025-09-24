import { Link } from 'react-router-dom';
import { Watch, ShoppingBag, Footprints, Glasses } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categoryData = [
  {
    id: 'watches',
    name: 'Watches',
    icon: Watch,
    description: 'Luxury timepieces',
    itemCount: '120+ items',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'bags',
    name: 'Bags',
    icon: ShoppingBag,
    description: 'Designer handbags',
    itemCount: '85+ items',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'footwear',
    name: 'Footwear',
    icon: Footprints,
    description: 'Premium shoes',
    itemCount: '200+ items',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Glasses,
    description: 'Style essentials',
    itemCount: '150+ items',
    color: 'from-orange-500 to-orange-600',
  },
];

export function Categories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated categories, each featuring the finest 
            products in their class.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-hover hover:-translate-y-2 border-0 shadow-product overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
                      <Icon className="h-12 w-12 text-white z-10" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-shop-primary transition-colors duration-200">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-shop-primary">
                          {category.itemCount}
                        </span>
                        <span className="text-sm text-muted-foreground group-hover:text-shop-primary transition-colors duration-200">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}