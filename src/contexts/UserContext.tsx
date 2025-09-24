import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, Order, Address, PaymentMethod } from '@/types/order';

interface UserContextType {
  user: UserProfile | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (index: number) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (index: number) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data
const mockUser: UserProfile = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1 (555) 123-4567',
  addresses: [
    {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'West Haven',
      state: 'CT',
      zipCode: '06516',
      phone: '+1 (555) 123-4567'
    }
  ],
  paymentMethods: [
    {
      type: 'credit',
      lastFourDigits: '4567',
      cardBrand: 'Visa'
    }
  ]
};

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-12-01',
    status: 'Delivered',
    total: 299.99,
    items: [
      {
        productId: 'sony-wh1000xm4',
        productTitle: 'Sony WH-1000XM4 Wireless Headphones',
        productImage: '/placeholder.svg',
        quantity: 1,
        price: 299.99,
        seller: 'ElectroStore'
      }
    ],
    shippingAddress: mockUser.addresses[0],
    trackingNumber: 'TR123456789'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-12-05',
    status: 'Arriving Sunday',
    total: 159.99,
    items: [
      {
        productId: 'nike-air-max-270',
        productTitle: 'Nike Air Max 270 Men\'s Shoes',
        productImage: '/placeholder.svg',
        quantity: 1,
        price: 159.99,
        seller: 'Nike Official Store'
      }
    ],
    shippingAddress: mockUser.addresses[0],
    trackingNumber: 'TR987654321'
  }
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      setUser(mockUser);
      setOrders(mockOrders);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...profile });
    }
  };

  const addAddress = (address: Address) => {
    if (user) {
      setUser({
        ...user,
        addresses: [...user.addresses, address]
      });
    }
  };

  const removeAddress = (index: number) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.filter((_, i) => i !== index)
      });
    }
  };

  const addPaymentMethod = (method: PaymentMethod) => {
    if (user) {
      setUser({
        ...user,
        paymentMethods: [...user.paymentMethods, method]
      });
    }
  };

  const removePaymentMethod = (index: number) => {
    if (user) {
      setUser({
        ...user,
        paymentMethods: user.paymentMethods.filter((_, i) => i !== index)
      });
    }
  };

  const value: UserContextType = {
    user,
    orders,
    login,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
    addPaymentMethod,
    removePaymentMethod,
    isLoggedIn: !!user
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}