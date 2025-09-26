import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { catalog, topCategories } from '@/data/taxonomy';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useUser();



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Main Header - Single Row Layout like reference image */}
      <div className="bg-dark text-white">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-lg-2 col-md-3 col-6">
              <Link to="/" className="text-decoration-none d-flex align-items-center">
                <h2 className="mb-0 fw-bold text-white me-3">ShopHub</h2>
                <div className="d-flex align-items-center text-white">
                  <MapPin size={18} className="me-1" />
                  <div>
                    <small className="d-block">Delivery</small>
                    <small className="fw-bold">Location</small>
                  </div>
                </div>
              </Link>
            </div>

            {/* Search Bar - Large and Central */}
            <div className="col-lg-6 col-md-5 col-12 order-3 order-md-2 mt-2 mt-md-0">
              <form onSubmit={handleSearch}>
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ fontSize: '16px' }}
                  />
                  <button className="btn btn-warning" type="submit">
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Account, Orders, Cart - Right Side */}
            <div className="col-lg-4 col-md-4 col-6 order-2 order-md-3">
              <div className="d-flex align-items-center justify-content-end">
                {/* Account */}
                <div className="me-4 d-none d-md-block">
                  <Link to="/account" className="text-white text-decoration-none">
                    <div className="d-flex align-items-center">
                      <User size={24} className="me-2" />
                      <div>
                        <small className="d-block">Hello, {isLoggedIn ? user?.firstName : 'Sign in'}</small>
                        <span className="fw-bold">Account</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Orders */}
                <div className="me-4 d-none d-md-block">
                  <Link to="/orders" className="text-white text-decoration-none">
                    <div className="text-center">
                      <small className="d-block">Returns</small>
                      <span className="fw-bold">& Orders</span>
                    </div>
                  </Link>
                </div>

                {/* Cart */}
                <Link to="/cart" className="text-white text-decoration-none position-relative">
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-2">
                      <ShoppingCart size={32} />
                      {totalItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: '12px' }}>
                          {totalItems}
                        </span>
                      )}
                    </div>
                    <span className="fw-bold d-none d-lg-inline">Cart</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar - With Overflow Handling */}
      <div className="bg-dark">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark p-0">
            <div className="d-flex align-items-center w-100">
              {/* All Categories Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-dark d-flex align-items-center px-3 py-2 text-nowrap border-0"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  style={{ backgroundColor: '#37474f' }}
                >
                  <Menu size={16} className="me-2" />
                  All
                  <ChevronDown size={16} className="ms-1" />
                </button>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="dropdown-menu show position-absolute" style={{ zIndex: 1050, minWidth: '250px' }}>
                    <h6 className="dropdown-header">Shop by Department</h6>
                    {topCategories.map((category) => (
                      <Link
                        key={category}
                        to={`/c/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                        className="dropdown-item"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Visible Categories - Show as many as fit */}
              <div className="navbar-nav d-flex flex-row overflow-hidden py-2 flex-grow-1">
                {topCategories.slice(0, 8).map((category) => (
                  <Link
                    key={category}
                    to={`/c/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="nav-link text-white px-3 py-2 text-nowrap d-none d-lg-block"
                  >
                    {category}
                  </Link>
                ))}

                {/* Show fewer on medium screens */}
                {topCategories.slice(0, 5).map((category) => (
                  <Link
                    key={`md-${category}`}
                    to={`/c/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="nav-link text-white px-3 py-2 text-nowrap d-none d-md-block d-lg-none"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

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