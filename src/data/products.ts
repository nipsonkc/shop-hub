import { Product } from '@/types/product';
import productWatch from '@/assets/product-watch.jpg';
import productBag from '@/assets/product-bag.jpg';
import productShoes from '@/assets/product-shoes.jpg';
import productSunglasses from '@/assets/product-sunglasses.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Luxury Chronograph Watch',
    price: 899,
    originalPrice: 1199,
    image: productWatch,
    category: 'Watches',
    description: 'Premium Swiss-made chronograph watch with stainless steel case and leather strap. Features precise movement and water resistance up to 100m.',
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    name: 'Designer Leather Handbag',
    price: 549,
    image: productBag,
    category: 'Bags',
    description: 'Elegant genuine leather handbag crafted from premium materials. Perfect for both professional and casual occasions with spacious interior.',
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Premium Athletic Sneakers',
    price: 189,
    originalPrice: 249,
    image: productShoes,
    category: 'Footwear',
    description: 'High-performance athletic sneakers with advanced cushioning technology. Ideal for both sports and everyday wear.',
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    price: 299,
    image: productSunglasses,
    category: 'Accessories',
    description: 'Stylish designer sunglasses with UV protection and polarized lenses. Premium frame construction with modern aesthetic.',
    inStock: false,
    rating: 4.6,
    reviewCount: 73,
  },
];

export const categories = [
  'All Products',
  'Watches',
  'Bags', 
  'Footwear',
  'Accessories',
];