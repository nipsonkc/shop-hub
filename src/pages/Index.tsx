import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Categories } from '@/components/Categories';
import { SliderWithCategories } from '@/components/SliderWithCategories';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SliderWithCategories />
      <FeaturedProducts />
      <Categories />
    </div>
  );
};

export default Index;
