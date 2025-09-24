import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { catalog } from '@/data/taxonomy';
import { sampleProducts } from '@/data/sampleProducts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Homepage() {
  const topCategories = Object.keys(catalog);
  const trendingProducts = sampleProducts.slice(0, 4);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold mb-3">
                  Discover Amazing Products
                </h1>
                <p className="lead mb-4">
                  Shop from millions of products with fast, free shipping and easy returns.
                </p>
                <Link to="/products" className="btn btn-light btn-lg">
                  Shop Now
                </Link>
              </div>
              <div className="col-lg-6">
                <img 
                  src="/placeholder.svg" 
                  alt="Hero Banner" 
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">Shop by Category</h2>
            <div className="row g-4">
              {topCategories.map((category) => (
                <div key={category} className="col-6 col-md-4 col-lg-3">
                  <Link 
                    to={`/c/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100 shadow-sm">
                      <div className="card-body text-center">
                        <img 
                          src="/placeholder.svg" 
                          alt={category}
                          className="img-fluid mb-3 rounded"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <h6 className="card-title text-dark">{category}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Trending Products</h2>
              <Link to="/products" className="btn btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="row g-4">
              {trendingProducts.map((product) => (
                <div key={product.id} className="col-6 col-md-3">
                  <Link to={`/p/${product.slug}`} className="text-decoration-none">
                    <div className="card h-100 shadow-sm">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title text-truncate">{product.title}</h6>
                        <div className="d-flex align-items-center mb-2">
                          <span className="text-warning me-1">★★★★★</span>
                          <small className="text-muted">({product.reviewCount})</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="h5 text-primary mb-0">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-muted text-decoration-line-through ms-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>Customer Service</h5>
                <ul className="list-unstyled">
                  <li><Link to="/help" className="text-decoration-none">Help Center</Link></li>
                  <li><Link to="/returns" className="text-decoration-none">Returns</Link></li>
                  <li><Link to="/shipping" className="text-decoration-none">Shipping Info</Link></li>
                  <li><Link to="/contact" className="text-decoration-none">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Shopping Tools</h5>
                <ul className="list-unstyled">
                  <li><Link to="/wishlist" className="text-decoration-none">Wishlist</Link></li>
                  <li><Link to="/compare" className="text-decoration-none">Compare Products</Link></li>
                  <li><Link to="/gift-cards" className="text-decoration-none">Gift Cards</Link></li>
                  <li><Link to="/mobile-app" className="text-decoration-none">Mobile App</Link></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Account</h5>
                <ul className="list-unstyled">
                  <li><Link to="/account" className="text-decoration-none">Your Account</Link></li>
                  <li><Link to="/orders" className="text-decoration-none">Order History</Link></li>
                  <li><Link to="/addresses" className="text-decoration-none">Addresses</Link></li>
                  <li><Link to="/payment" className="text-decoration-none">Payment Methods</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}