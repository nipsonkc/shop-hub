import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useUser } from '@/contexts/UserContext';
import { Package, Truck, CheckCircle, XCircle, Eye, Star } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrdersPage() {
  const { orders, isLoggedIn } = useUser();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="text-success" size={20} />;
      case 'Arriving Sunday':
        return <Truck className="text-primary" size={20} />;
      case 'Cancelled':
        return <XCircle className="text-danger" size={20} />;
      default:
        return <Package className="text-info" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-success';
      case 'Arriving Sunday':
        return 'text-primary';
      case 'Cancelled':
        return 'text-danger';
      default:
        return 'text-info';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h2>Sign in to view your orders</h2>
            <p className="text-muted">You need to be logged in to access your order history.</p>
            <Link to="/account" className="btn btn-primary">Sign In</Link>
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
              <h1 className="h2 mb-4">Your Orders</h1>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-5">
              <Package size={64} className="text-muted mb-3" />
              <h3>No orders yet</h3>
              <p className="text-muted">You haven't placed any orders yet.</p>
              <Link to="/products" className="btn btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                {orders.map((order) => (
                  <div key={order.id} className="card mb-4">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <small className="text-muted">ORDER #{order.orderNumber}</small>
                          <div className="fw-bold">Placed on {new Date(order.date).toLocaleDateString()}</div>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted">TOTAL</small>
                          <div className="fw-bold">${order.total.toFixed(2)}</div>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted">SHIP TO</small>
                          <div className="fw-bold">{order.shippingAddress.name}</div>
                        </div>
                        <div className="col-md-3 text-md-end">
                          <div className="d-flex align-items-center justify-content-md-end">
                            {getStatusIcon(order.status)}
                            <span className={`ms-2 fw-bold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-body">
                      {/* Order Items */}
                      <div className="row">
                        {order.items.map((item) => (
                          <div key={item.productId} className="col-md-6 mb-3">
                            <div className="d-flex align-items-center">
                              <img
                                src={item.productImage}
                                alt={item.productTitle}
                                className="rounded me-3"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                              />
                              <div className="flex-grow-1">
                                <h6 className="mb-1">{item.productTitle}</h6>
                                <small className="text-muted">Sold by {item.seller}</small>
                                <div className="text-muted">
                                  Qty: {item.quantity} | ${item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 flex-wrap mt-3">
                        {order.status === 'Delivered' && (
                          <button className="btn btn-outline-primary btn-sm">
                            <Star size={14} className="me-1" />
                            Write a Review
                          </button>
                        )}
                        {order.status === 'Arriving Sunday' && (
                          <button className="btn btn-outline-primary btn-sm">
                            <Truck size={14} className="me-1" />
                            Track Package
                          </button>
                        )}
                        <button className="btn btn-outline-secondary btn-sm">
                          <Eye size={14} className="me-1" />
                          View Order Details
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          View Invoice
                        </button>
                        {order.status === 'Delivered' && (
                          <button className="btn btn-outline-warning btn-sm">
                            Return or Exchange
                          </button>
                        )}
                        <button className="btn btn-outline-success btn-sm">
                          Buy Again
                        </button>
                      </div>

                      {/* Tracking Info */}
                      {order.trackingNumber && (
                        <div className="mt-3 p-3 bg-light rounded">
                          <small className="text-muted">Tracking Number: </small>
                          <span className="fw-bold">{order.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}