import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-ecommerce.jpg';

export function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium fashion and lifestyle products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Discover
          <span className="block bg-gradient-to-r from-shop-accent to-yellow-400 bg-clip-text text-transparent">
            Premium Style
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Curated collection of luxury products designed for the modern lifestyle. 
          Quality, style, and sophistication in every piece.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/products">
            <Button size="lg" variant="shop" className="text-lg px-8 py-6">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/categories">
            <Button size="lg" variant="shop-outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-shop-primary">
              Browse Categories
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-shop-accent">1000+</div>
            <div className="text-sm text-gray-300">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-shop-accent">50k+</div>
            <div className="text-sm text-gray-300">Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-shop-accent">4.9★</div>
            <div className="text-sm text-gray-300">Rating</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}