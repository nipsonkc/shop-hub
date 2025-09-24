import { Product } from '@/types/product';

// Backward compatibility - map old product structure to new
const transformProduct = (product: any): Product => ({
  ...product,
  name: product.title,
  image: product.images[0]
});

const rawProducts = [
  {
    id: "gibson-les-paul-sunburst",
    title: "Gibson Les Paul Guitar",
    slug: "gibson-les-paul-guitar-sunburst",
    categoryPath: ["Sports & Outdoors", "Music", "Guitar"],
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    price: 300.00,
    originalPrice: 350.00,
    currency: "USD",
    rating: 5.0,
    reviewCount: 27,
    badges: ["Best Seller"],
    options: { 
      "Size": ["X-Small", "Small", "Medium", "Large", "X-Large"] 
    },
    specs: {
      "Brand": "Gibson",
      "Color": "Sunburst (Red)",
      "Top Material Type": "Spruce Wood",
      "Body Material": "Mahogany",
      "Neck Material": "Mahogany",
      "String Material Type": "Steel"
    },
    seller: "Nipson Music",
    stock: 4,
    shipping: {
      shipFrom: "Nipson Music",
      deliveryWindows: [
        "Aug 4–Aug 6",
        "Estimated Monday, Jan 24"
      ]
    },
    description: "Premium tonewoods with Sitka spruce top and mahogany body for balanced resonance. Reinforced packaging to prevent shipping damage.",
    descriptionBullets: [
      "Premium tonewoods with Sitka spruce top and mahogany body for balanced resonance.",
      "Reinforced packaging to prevent shipping damage."
    ],
    relatedSkus: ["fender-stratocaster-black", "flying-v-classic"],
    inStock: true,
    category: "Sports & Outdoors"
  },
  {
    id: "sony-wh1000xm4",
    title: "Sony WH-1000XM4 Wireless Headphones",
    slug: "sony-wh1000xm4-wireless-headphones",
    categoryPath: ["Electronics", "Audio Devices", "Headphones"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 299.99,
    originalPrice: 349.99,
    currency: "USD",
    rating: 4.8,
    reviewCount: 1247,
    badges: ["Editor's Choice"],
    options: { "Color": ["Black", "Silver", "Blue"] },
    specs: {
      "Brand": "Sony",
      "Color": "Black",
      "Connectivity": "Bluetooth 5.0",
      "Battery Life": "30 hours",
      "Noise Cancellation": "Active"
    },
    seller: "ElectroStore",
    stock: 15,
    shipping: {
      shipFrom: "ElectroStore",
      deliveryWindows: ["Dec 10–Dec 12", "Express delivery available"]
    },
    description: "Industry-leading noise canceling with Dual Noise Sensor technology",
    descriptionBullets: [
      "Industry-leading noise canceling with Dual Noise Sensor technology",
      "30-hour battery life with quick charge",
      "Touch sensor controls to pause, play, skip tracks"
    ],
    relatedSkus: ["bose-qc35", "apple-airpods-max"],
    inStock: true,
    category: "Electronics"
  },
  {
    id: "nike-air-max-270",
    title: "Nike Air Max 270 Men's Shoes",
    slug: "nike-air-max-270-mens-shoes",
    categoryPath: ["Men", "Shoes", "Sneakers"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 159.99,
    currency: "USD",
    rating: 4.6,
    reviewCount: 892,
    badges: ["New Arrival"],
    options: { 
      "Size": ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
      "Color": ["White/Black", "Black/Red", "Blue/White"]
    },
    specs: {
      "Brand": "Nike",
      "Color": "White/Black",
      "Material": "Mesh upper",
      "Sole Material": "Rubber",
      "Closure Type": "Lace-up"
    },
    seller: "Nike Official Store",
    stock: 25,
    shipping: {
      shipFrom: "Nike Official Store",
      deliveryWindows: ["Dec 8–Dec 10", "Free shipping on orders over $50"]
    },
    description: "The largest Max Air unit yet delivers more comfort underfoot",
    descriptionBullets: [
      "The largest Max Air unit yet delivers more comfort underfoot",
      "Engineered mesh upper is lightweight and breathable",
      "Heel clip provides stability and a sleek look"
    ],
    relatedSkus: ["adidas-ultraboost", "puma-rs-x"],
    inStock: true,
    category: "Men"
  },
  {
    id: "samsung-galaxy-s23",
    title: "Samsung Galaxy S23 5G Smartphone",
    slug: "samsung-galaxy-s23-5g-smartphone",
    categoryPath: ["Electronics", "Mobiles & Tablets", "Smartphones"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 799.99,
    originalPrice: 899.99,
    currency: "USD",
    rating: 4.7,
    reviewCount: 456,
    badges: ["5G Ready", "Best Seller"],
    options: { 
      "Storage": ["128GB", "256GB", "512GB"],
      "Color": ["Phantom Black", "Cream", "Green"]
    },
    specs: {
      "Brand": "Samsung",
      "Screen Size": "6.1 inches",
      "Storage": "128GB",
      "RAM": "8GB",
      "Camera": "50MP Triple Camera",
      "Battery": "3900mAh"
    },
    seller: "Samsung Official",
    stock: 8,
    shipping: {
      shipFrom: "Samsung Official",
      deliveryWindows: ["Dec 12–Dec 14", "Free shipping included"]
    },
    description: "Epic moments, made easy with the most advanced Galaxy camera system",
    descriptionBullets: [
      "Epic moments, made easy with the most advanced Galaxy camera system",
      "Snapdragon 8 Gen 2 processor for lightning-fast performance",
      "All-day battery life with super fast charging"
    ],
    relatedSkus: ["iphone-14-pro", "pixel-7-pro"],
    inStock: true,
    category: "Electronics"
  },
  {
    id: "zara-floral-dress",
    title: "Zara Floral Print Midi Dress",
    slug: "zara-floral-print-midi-dress",
    categoryPath: ["Women", "Clothing", "Dresses"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 89.99,
    currency: "USD",
    rating: 4.5,
    reviewCount: 234,
    badges: ["Trending"],
    options: { 
      "Size": ["XS", "S", "M", "L", "XL"],
      "Color": ["Floral Blue", "Floral Pink"]
    },
    specs: {
      "Brand": "Zara",
      "Material": "100% Polyester",
      "Care Instructions": "Machine wash cold",
      "Fit": "Regular fit",
      "Length": "Midi"
    },
    seller: "Zara Official",
    stock: 12,
    shipping: {
      shipFrom: "Zara Official",
      deliveryWindows: ["Dec 9–Dec 11", "Express shipping available"]
    },
    description: "Elegant floral midi dress perfect for any occasion",
    descriptionBullets: [
      "Elegant floral midi dress perfect for any occasion",
      "Lightweight and comfortable fabric",
      "Versatile design suitable for casual and formal events"
    ],
    relatedSkus: ["h&m-summer-dress", "mango-wrap-dress"],
    inStock: true,
    category: "Women"
  },
  {
    id: "lego-creator-expert",
    title: "LEGO Creator Expert Building Set",
    slug: "lego-creator-expert-building-set",
    categoryPath: ["Kids & Baby", "Toys & Games", "Educational Toys"],
    images: ["/placeholder.svg", "/placeholder.svg"],
    price: 249.99,
    currency: "USD",
    rating: 4.9,
    reviewCount: 567,
    badges: ["Educational", "Best Seller"],
    options: { "Age Group": ["8-12 years", "13+ years"] },
    specs: {
      "Brand": "LEGO",
      "Age Range": "8-12 years",
      "Piece Count": "2573",
      "Theme": "Creator Expert",
      "Material": "Plastic"
    },
    seller: "LEGO Official Store",
    stock: 18,
    shipping: {
      shipFrom: "LEGO Official Store",
      deliveryWindows: ["Dec 7–Dec 9", "Gift wrapping available"]
    },
    description: "Advanced building experience with detailed architectural design",
    descriptionBullets: [
      "Advanced building experience with detailed architectural design",
      "Includes over 2500 high-quality LEGO pieces",
      "Perfect for developing creativity and problem-solving skills"
    ],
    relatedSkus: ["lego-technic-car", "lego-city-police"],
    inStock: true,
    category: "Kids & Baby"
  }
];

export const sampleProducts: Product[] = rawProducts.map(transformProduct);

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All Products") return sampleProducts;
  return sampleProducts.filter(product => product.category === category);
};

// Function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};

// Function to search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return sampleProducts.filter(product =>
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Function to filter products by price range
export const filterProductsByPrice = (products: Product[], priceRange: string): Product[] => {
  if (priceRange === "All") return products;
  
  const [min, max] = priceRange.split("-").map(p => p === "1000+" ? "9999" : p).map(Number);
  return products.filter(product => product.price >= min && product.price <= max);
};

// Function to filter products by rating
export const filterProductsByRating = (products: Product[], rating: string): Product[] => {
  if (rating === "All") return products;
  
  const minRating = parseInt(rating.split(" ")[0]);
  return products.filter(product => product.rating >= minRating);
};