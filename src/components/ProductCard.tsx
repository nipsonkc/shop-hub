import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };


  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 border-0 shadow-product">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-105"
          />

          {/* Out of Stock Badge */}
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              Out of Stock
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={handleToggleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          {/* Quick Add to Cart */}
          <Button
            variant={product.stock > 0 ? "default" : "secondary"}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.stock > 0 ? 'Quick Add' : 'Out of Stock'}
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{product.categoryPath[0]}</span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-lg text-foreground group-hover:text-shop-primary transition-colors duration-200">
              {product.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.descriptionBullets[0]}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-shop-primary">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}