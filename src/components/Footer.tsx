import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white mt-5">
      {/* Back to Top */}
      <div className="bg-secondary text-center py-2">
        <button 
          className="btn btn-link text-white text-decoration-none p-0"
          onClick={scrollToTop}
        >
          <ArrowUp size={16} className="me-1" />
          Back to Top
        </button>
      </div>

      <div className="container py-5">
        <div className="row">
          {/* Get to Know Us */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Get to Know Us</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              <li><Link to="/careers" className="text-light text-decoration-none">Careers</Link></li>
              <li><Link to="/newsletter" className="text-light text-decoration-none">Newsletter</Link></li>
              <li><Link to="/terms" className="text-light text-decoration-none">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Make Money with Us</h6>
            <ul className="list-unstyled">
              <li><Link to="/sell" className="text-light text-decoration-none">Sell on ShopHub</Link></li>
              <li><Link to="/affiliate" className="text-light text-decoration-none">Affiliate Program</Link></li>
              <li><Link to="/advertise" className="text-light text-decoration-none">Advertise Your Products</Link></li>
              <li><Link to="/fulfillment" className="text-light text-decoration-none">Fulfillment by ShopHub</Link></li>
            </ul>
          </div>

          {/* Your Account */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Your Account</h6>
            <ul className="list-unstyled">
              <li><Link to="/account" className="text-light text-decoration-none">Your Account</Link></li>
              <li><Link to="/orders" className="text-light text-decoration-none">Your Orders</Link></li>
              <li><Link to="/returns" className="text-light text-decoration-none">Returns & Replacements</Link></li>
              <li><Link to="/help" className="text-light text-decoration-none">Help Center</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li><Link to="/shipping" className="text-light text-decoration-none">Shipping Rates & Policies</Link></li>
              <li><Link to="/customer-care" className="text-light text-decoration-none">Customer Care</Link></li>
              <li><Link to="/returns" className="text-light text-decoration-none">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Section */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <Link to="/" className="text-decoration-none">
              <h5 className="text-white mb-0">ShopHub</h5>
            </Link>
            <small className="text-muted">Your one-stop shopping destination</small>
          </div>
          <div className="col-md-6 text-md-end">
            <small className="text-muted">
              © 2024 ShopHub. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}