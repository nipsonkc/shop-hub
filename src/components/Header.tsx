import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { catalog } from '@/data/taxonomy';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useUser();

  const topCategories = Object.keys(catalog);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-bottom">
      {/* Top Bar */}
      <div className="bg-dark text-white py-1">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <small>Free shipping on orders over $50</small>
            </div>
            <div className="col-md-6 text-end">
              <small>
                <Link to="/orders" className="text-white text-decoration-none me-3">Orders</Link>
                <Link to="/account" className="text-white text-decoration-none">Account</Link>
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-fluid py-3">
        <div className="row align-items-center">
          {/* Mobile Menu Toggle */}
          <div className="col-2 d-lg-none">
            <button
              className="btn btn-link p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="col-8 col-lg-2 text-center text-lg-start">
            <Link to="/" className="text-decoration-none">
              <h2 className="mb-0 fw-bold text-primary">ShopHub</h2>
            </Link>
          </div>

          {/* Delivery Location */}
          <div className="col-lg-2 d-none d-lg-block">
            <div className="d-flex align-items-center text-muted">
              <MapPin size={16} className="me-1" />
              <small>
                <div>Deliver to</div>
                <div className="fw-bold text-dark">West Haven, CT</div>
              </small>
            </div>
          </div>

          {/* Search Bar */}
          <div className="col-lg-4 d-none d-lg-block">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="col-2 col-lg-4">
            <div className="d-flex align-items-center justify-content-end">
              {/* Account Dropdown */}
              <div className="dropdown me-3 d-none d-lg-block">
                <button
                  className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                >
                  <User size={20} className="me-1" />
                  <small>
                    <div>Hello, {isLoggedIn ? user?.firstName : 'Sign in'}</div>
                    <div className="fw-bold">Account & Lists</div>
                  </small>
                </button>
              </div>

              {/* Cart */}
              <Link to="/cart" className="btn btn-link text-decoration-none p-0 position-relative">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
                <div className="d-none d-lg-block">
                  <small className="d-block">Cart</small>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="row mt-3 d-lg-none">
          <div className="col-12">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-top">
        <div className="container-fluid">
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/products">All</Link>
              </li>
              {topCategories.map((category) => (
                <li key={category} className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/c/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-white" style={{ zIndex: 1050 }}>
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Menu</h5>
              <button className="btn btn-link p-0" onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <ul className="list-unstyled">
              {isLoggedIn ? (
                <>
                  <li className="mb-2">
                    <Link to="/account" className="text-decoration-none">Your Account</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/orders" className="text-decoration-none">Your Orders</Link>
                  </li>
                  <li className="mb-2">
                    <button className="btn btn-link p-0 text-decoration-none" onClick={logout}>
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li className="mb-2">
                  <Link to="/account" className="text-decoration-none">Sign In</Link>
                </li>
              )}
              <hr />
              {topCategories.map((category) => (
                <li key={category} className="mb-2">
                  <Link
                    to={`/c/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-decoration-none"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}