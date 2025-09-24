export const catalog = {
  "Men": {
    "Clothing": [
      "T-Shirts & Polos",
      "Shirts",
      "Jeans & Pants",
      "Jackets & Hoodies",
      "Shorts",
      "Ethnic & Traditional Wear"
    ],
    "Shoes": [
      "Sneakers",
      "Formal Shoes",
      "Casual Shoes",
      "Sandals & Slippers"
    ],
    "Accessories": [
      "Bags & Wallets",
      "Belts",
      "Sunglasses",
      "Caps & Hats",
      "Watches"
    ],
    "Fashion Jewellery": [
      "Bracelets",
      "Rings",
      "Necklaces & Pendants"
    ],
    "Innerwear & Sleepwear": [
      "Boxers & Briefs",
      "Vests",
      "Pajamas & Loungewear"
    ]
  },
  "Women": {
    "Clothing": [
      "Tops & T-Shirts",
      "Dresses",
      "Kurtis & Tunics",
      "Sarees",
      "Jeans & Trousers",
      "Skirts & Shorts",
      "Ethnic Sets"
    ],
    "Shoes": [
      "Heels",
      "Flats",
      "Sneakers",
      "Sandals"
    ],
    "Accessories": [
      "Bags & Purses",
      "Belts",
      "Sunglasses",
      "Hair Accessories",
      "Watches"
    ],
    "Fashion Jewellery": [
      "Earrings",
      "Necklaces",
      "Bangles & Bracelets",
      "Rings"
    ],
    "Lingerie & Sleepwear": [
      "Bras",
      "Panties",
      "Nightwear",
      "Shapewear"
    ]
  },
  "Kids & Baby": {
    "Clothing": [
      "Boys Clothing",
      "Girls Clothing",
      "Baby Clothing (0–2 yrs)"
    ],
    "Footwear": [
      "School Shoes",
      "Sandals & Slippers",
      "Sneakers"
    ],
    "Toys & Games": [
      "Action Figures",
      "Educational Toys",
      "Soft Toys",
      "Board Games"
    ],
    "Baby Essentials": [
      "Diapers & Wipes",
      "Feeding & Nursing",
      "Baby Care Products",
      "Strollers & Carriers"
    ]
  },
  "Electronics": {
    "Mobiles & Tablets": [
      "Smartphones",
      "Tablets",
      "Mobile Accessories"
    ],
    "Computers & Accessories": [
      "Laptops",
      "Desktops",
      "Monitors",
      "Keyboards & Mice",
      "Storage Devices"
    ],
    "Audio Devices": [
      "Headphones",
      "Bluetooth Speakers",
      "Soundbars"
    ],
    "TV & Entertainment": [
      "Televisions",
      "Streaming Devices",
      "Home Theaters"
    ],
    "Smart Devices": [
      "Smart Watches",
      "Fitness Bands",
      "Smart Home Accessories"
    ]
  },
  "Home & Living": {
    "Furniture": [
      "Beds & Mattresses",
      "Sofas & Recliners",
      "Tables & Chairs"
    ],
    "Home Décor": [
      "Wall Art",
      "Curtains & Blinds",
      "Clocks & Lamps"
    ],
    "Kitchen & Dining": [
      "Cookware",
      "Serveware",
      "Storage & Containers"
    ],
    "Bedding & Bath": [
      "Bed Sheets & Pillows",
      "Towels & Bathrobes",
      "Blankets & Comforters"
    ]
  },
  "Beauty & Health": {
    "Skincare": [
      "Face Wash",
      "Moisturizers",
      "Sunscreens"
    ],
    "Haircare": [
      "Shampoos",
      "Conditioners",
      "Hair Oils & Serums"
    ],
    "Makeup": [
      "Lipsticks",
      "Foundations",
      "Eyeliners & Mascara"
    ],
    "Personal Care": [
      "Bath & Shower",
      "Oral Care",
      "Hygiene Products"
    ],
    "Health & Wellness": [
      "Supplements",
      "Fitness Equipment",
      "First Aid & Medical"
    ]
  },
  "Groceries & Food": {
    "Packaged Food": [
      "Fruits & Vegetables",
      "Dairy & Eggs",
      "Bakery & Snacks",
      "Grains, Pulses & Spices",
      "Instant Noodles & Pasta",
      "Sauces & Spreads",
      "Breakfast Cereals"
    ],
    "Beverages": [
      "Juices & Drinks",
      "Tea & Coffee",
      "Water & Soda"
    ]
  },
  "Sports & Outdoors": {
    "Fitness Equipment": [
      "Treadmills",
      "Dumbbells & Weights",
      "Yoga Mats"
    ],
    "Sports Gear": [
      "Cricket",
      "Football",
      "Badminton"
    ],
    "Outdoor & Travel": [
      "Camping Gear",
      "Trekking Bags",
      "Water Bottles & Flasks"
    ],
    "Music": [
      "Guitar",
      "Drums",
      "Bass",
      "Microphone",
      "Wires",
      "Accessories"
    ]
  },
  "Automobile & Tools": {
    "Car Accessories": [
      "Seat Covers",
      "Cleaning Supplies",
      "Car Electronics"
    ],
    "Bike Accessories": [
      "Helmets",
      "Body Covers",
      "Bike Lights"
    ],
    "Tools & Hardware": [
      "Hand Tools",
      "Power Tools",
      "Tool Kits"
    ]
  },
  "Pet Supplies": {
    "Dog Supplies": [
      "Food",
      "Toys",
      "Grooming"
    ],
    "Cat Supplies": [
      "Food",
      "Litter",
      "Toys & Scratchers"
    ],
    "Fish & Bird Supplies": [
      "Food",
      "Cages & Aquariums",
      "Cleaning Tools"
    ]
  }
};

export const topCategories = Object.keys(catalog);

export const getAllSubcategories = (category: string) => {
  return catalog[category as keyof typeof catalog] || {};
};

export const getAllItemTypes = (category: string, subcategory: string) => {
  const subcat = catalog[category as keyof typeof catalog];
  if (subcat) {
    return subcat[subcategory as keyof typeof subcat] || [];
  }
  return [];
};

export const priceRanges = ["0-100", "100-250", "250-500", "500-1000", "1000+"];
export const ratingSteps = ["4 & up", "3 & up", "2 & up", "1 & up"];