import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { CheckoutData, Address, PaymentMethod, DeliveryOption } from '@/types/order';
import { CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingAddress: user?.addresses[0] || {
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    },
    paymentMethod: user?.paymentMethods[0] || {
      type: 'credit',
      lastFourDigits: '',
      cardBrand: ''
    },
    deliveryOption: {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 business days',
      price: 0,
      estimatedDays: 'Dec 15-17'
    }
  });

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 business days',
      price: 0,
      estimatedDays: 'Dec 15-17'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '2-3 business days',
      price: 9.99,
      estimatedDays: 'Dec 12-13'
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      description: '1 business day',
      price: 19.99,
      estimatedDays: 'Dec 11'
    }
  ];

  const subtotal = totalPrice;
  const tax = subtotal * 0.08;
  const shippingFee = checkoutData.deliveryOption.price;
  const total = subtotal + tax + shippingFee;

  const handleAddressChange = (field: keyof Address, value: string) => {
    setCheckoutData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value
      }
    }));
  };

  const handleDeliveryOptionChange = (option: DeliveryOption) => {
    setCheckoutData(prev => ({
      ...prev,
      deliveryOption: option
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      
      <main className="flex-grow-1">
        <div className="container py-4">
          <div className="row">
            <div className="col-12">
              <Link to="/cart" className="btn btn-link p-0 mb-3">
                <ArrowLeft size={16} className="me-1" />
                Back to Cart
              </Link>
              <h1 className="h2 mb-4">Checkout</h1>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="row">
              {/* Left Column - Forms */}
              <div className="col-lg-8">
                {/* Shipping Address */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">1. Shipping Address</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={checkoutData.shippingAddress.name}
                          onChange={(e) => handleAddressChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={checkoutData.shippingAddress.phone || ''}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Street Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={checkoutData.shippingAddress.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={checkoutData.shippingAddress.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={checkoutData.shippingAddress.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">ZIP Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={checkoutData.shippingAddress.zipCode}
                          onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">2. Delivery Options</h5>
                  </div>
                  <div className="card-body">
                    {deliveryOptions.map((option) => (
                      <div key={option.id} className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="deliveryOption"
                          id={option.id}
                          checked={checkoutData.deliveryOption.id === option.id}
                          onChange={() => handleDeliveryOptionChange(option)}
                        />
                        <label className="form-check-label w-100" htmlFor={option.id}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-bold">{option.name}</div>
                              <small className="text-muted">{option.description}</small>
                              <div className="text-success">{option.estimatedDays}</div>
                            </div>
                            <div className="text-end">
                              {option.price === 0 ? (
                                <span className="text-success fw-bold">FREE</span>
                              ) : (
                                <span className="fw-bold">${option.price}</span>
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">3. Payment Method</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Card Number</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <CreditCard size={16} />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cardholder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="terms" required />
                      <label className="form-check-label" htmlFor="terms">
                        <small>
                          By placing your order, you agree to our 
                          <Link to="/terms" className="text-decoration-none"> conditions of use</Link> and 
                          <Link to="/privacy" className="text-decoration-none"> privacy notice</Link>.
                        </small>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="col-lg-4">
                <div className="card sticky-top" style={{ top: '100px' }}>
                  <div className="card-header">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    {/* Order Items */}
                    <div className="mb-3">
                      {items.map((item) => (
                        <div key={item.product.id} className="d-flex align-items-center mb-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="rounded me-3"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          <div className="flex-grow-1">
                            <h6 className="mb-1 small">{item.product.name}</h6>
                            <small className="text-muted">Qty: {item.quantity}</small>
                          </div>
                          <div className="text-end">
                            <span className="fw-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <hr />

                    {/* Price Breakdown */}
                    <div className="space-y-2 mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Shipping:</span>
                        <span>
                          {shippingFee === 0 ? (
                            <span className="text-success">FREE</span>
                          ) : (
                            `$${shippingFee.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between mb-4">
                      <span className="h5">Total:</span>
                      <span className="h5 text-primary">${total.toFixed(2)}</span>
                    </div>

                    {/* Place Order Button */}
                    <button type="submit" className="btn btn-warning btn-lg w-100 mb-3">
                      Place Order
                    </button>

                    {/* Security Info */}
                    <div className="text-center">
                      <small className="text-muted d-flex align-items-center justify-content-center">
                        <Shield size={14} className="me-1" />
                        Secure SSL encryption
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}