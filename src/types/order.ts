export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Delivered' | 'Arriving Sunday' | 'Cancelled' | 'Processing' | 'Shipped';
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
  seller: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
}

export interface CheckoutData {
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  deliveryOption: DeliveryOption;
}

export interface PaymentMethod {
  type: 'credit' | 'debit' | 'paypal' | 'apple_pay';
  lastFourDigits?: string;
  cardBrand?: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
}