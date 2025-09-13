export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vendorId: string;
  vendorName: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  totalProducts: number;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
}

export const vendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'Campus Electronics',
    description: 'Your one-stop shop for all electronic needs',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    rating: 4.8,
    totalProducts: 10
  },
  {
    id: 'vendor-2',
    name: 'Study Essentials',
    description: 'Books, stationery, and study materials',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    rating: 4.6,
    totalProducts: 10
  },
  {
    id: 'vendor-3',
    name: 'Campus Fashion',
    description: 'Trendy clothing and accessories for students',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
    rating: 4.7,
    totalProducts: 10
  }
];

export const products: Product[] = [
  // Campus Electronics Products
  {
    id: 'prod-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones perfect for studying and music',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 25,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 'prod-2',
    name: 'USB-C Hub Adapter',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card slots',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 15,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 'prod-3',
    name: 'Portable Power Bank',
    description: '20000mAh power bank with fast charging capability',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1609592806596-4d7b6b2f8f5e?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 30,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 'prod-4',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 40,
    rating: 4.4,
    reviews: 203
  },
  {
    id: 'prod-5',
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with USB charging port',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 20,
    rating: 4.7,
    reviews: 94
  },
  {
    id: 'prod-6',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with excellent sound quality',
    price: 55.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 18,
    rating: 4.5,
    reviews: 167
  },
  {
    id: 'prod-7',
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for better ergonomics',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 22,
    rating: 4.6,
    reviews: 112
  },
  {
    id: 'prod-8',
    name: 'Webcam HD 1080p',
    description: 'High-definition webcam for online classes and meetings',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 12,
    rating: 4.4,
    reviews: 78
  },
  {
    id: 'prod-9',
    name: 'Cable Organizer Set',
    description: 'Set of cable organizers to keep your workspace tidy',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 50,
    rating: 4.2,
    reviews: 234
  },
  {
    id: 'prod-10',
    name: 'Phone Stand',
    description: 'Adjustable phone stand for video calls and media viewing',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop',
    category: 'Electronics',
    vendorId: 'vendor-1',
    vendorName: 'Campus Electronics',
    stock: 35,
    rating: 4.3,
    reviews: 145
  },

  // Study Essentials Products
  {
    id: 'prod-11',
    name: 'Calculus Textbook',
    description: 'Comprehensive calculus textbook for engineering students',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    category: 'Books',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 8,
    rating: 4.8,
    reviews: 67
  },
  {
    id: 'prod-12',
    name: 'Scientific Calculator',
    description: 'Advanced scientific calculator for math and science courses',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
    category: 'Stationery',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 15,
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'prod-13',
    name: 'Notebook Set',
    description: 'Set of 5 high-quality notebooks for different subjects',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1544716278-e513176f20a5?w=400&h=400&fit=crop',
    category: 'Stationery',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 45,
    rating: 4.4,
    reviews: 298
  },
  {
    id: 'prod-14',
    name: 'Highlighter Pack',
    description: 'Pack of 12 colorful highlighters for studying',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    category: 'Stationery',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 60,
    rating: 4.3,
    reviews: 156
  },
  {
    id: 'prod-15',
    name: 'Study Planner',
    description: 'Academic year planner to organize your studies',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    category: 'Stationery',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 25,
    rating: 4.7,
    reviews: 123
  },
  {
    id: 'prod-16',
    name: 'Mechanical Pencil Set',
    description: 'Set of precision mechanical pencils for technical drawing',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop',
    category: 'Stationery',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 30,
    rating: 4.5,
    reviews: 87
  },
  {
    id: 'prod-17',
    name: 'Physics Lab Manual',
    description: 'Comprehensive physics laboratory manual with experiments',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop',
    category: 'Books',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 12,
    rating: 4.6,
    reviews: 54
  },
  {
    id: 'prod-18',
    name: 'Sticky Notes Pack',
    description: 'Assorted sticky notes for organizing and reminders',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    category: 'Stationery',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 80,
    rating: 4.2,
    reviews: 267
  },
  {
    id: 'prod-19',
    name: 'Binder Set',
    description: 'Set of 3 ring binders for organizing course materials',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1544716278-e513176f20a5?w=400&h=400&fit=crop',
    category: 'Stationery',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 20,
    rating: 4.4,
    reviews: 98
  },
  {
    id: 'prod-20',
    name: 'Dictionary',
    description: 'Comprehensive English dictionary for academic writing',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    category: 'Books',
    vendorId: 'vendor-2',
    vendorName: 'Study Essentials',
    stock: 15,
    rating: 4.5,
    reviews: 76
  },

  // Campus Fashion Products
  {
    id: 'prod-21',
    name: 'University Hoodie',
    description: 'Comfortable cotton hoodie with university logo',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'Clothing',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 28,
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'prod-22',
    name: 'Backpack',
    description: 'Durable backpack with laptop compartment',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Accessories',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 22,
    rating: 4.7,
    reviews: 189
  },
  {
    id: 'prod-23',
    name: 'Baseball Cap',
    description: 'Adjustable baseball cap with embroidered logo',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    category: 'Accessories',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 40,
    rating: 4.3,
    reviews: 234
  },
  {
    id: 'prod-24',
    name: 'Casual T-Shirt',
    description: 'Soft cotton t-shirt perfect for everyday wear',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Clothing',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 35,
    rating: 4.4,
    reviews: 167
  },
  {
    id: 'prod-25',
    name: 'Denim Jacket',
    description: 'Classic denim jacket for a timeless look',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    category: 'Clothing',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 18,
    rating: 4.5,
    reviews: 98
  },
  {
    id: 'prod-26',
    name: 'Sneakers',
    description: 'Comfortable sneakers for campus life',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'Footwear',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 25,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 'prod-27',
    name: 'Sweatpants',
    description: 'Comfortable sweatpants for lounging and workouts',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Clothing',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 30,
    rating: 4.4,
    reviews: 123
  },
  {
    id: 'prod-28',
    name: 'Sunglasses',
    description: 'Stylish sunglasses with UV protection',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    category: 'Accessories',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 45,
    rating: 4.2,
    reviews: 89
  },
  {
    id: 'prod-29',
    name: 'Watch',
    description: 'Stylish watch perfect for students',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop',
    category: 'Accessories',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 20,
    rating: 4.5,
    reviews: 134
  },
  {
    id: 'prod-30',
    name: 'Scarf',
    description: 'Warm and stylish scarf for cold weather',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
    category: 'Accessories',
    vendorId: 'vendor-3',
    vendorName: 'Campus Fashion',
    stock: 32,
    rating: 4.3,
    reviews: 76
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: '1',
    items: [
      {
        id: 'prod-1',
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
      },
      {
        id: 'prod-12',
        name: 'Scientific Calculator',
        price: 34.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop'
      }
    ],
    total: 114.98,
    status: 'shipped',
    createdAt: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-18T18:00:00Z'
  },
  {
    id: 'order-2',
    userId: '1',
    items: [
      {
        id: 'prod-21',
        name: 'University Hoodie',
        price: 49.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop'
      }
    ],
    total: 99.98,
    status: 'delivered',
    createdAt: '2024-01-10T14:20:00Z',
    estimatedDelivery: '2024-01-13T16:00:00Z'
  }
];