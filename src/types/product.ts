export interface Product {
  id: string;
  title: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images: string[];
  category: string;
  categoryPath: string[];
  description: string;
  descriptionBullets: string[];
  inStock: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  badges?: string[];
  options?: Record<string, string[]>;
  specs: Record<string, string | number>;
  seller: string;
  shipping: {
    shipFrom: string;
    deliveryWindows: string[];
  };
  relatedSkus: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}