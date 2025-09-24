import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useUser } from '@/contexts/UserContext';
import { User, MapPin, CreditCard, Package, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AccountPage() {
  const { user, isLoggedIn, login, logout, updateProfile, addAddress, removeAddress } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [showLoginForm, setShowLoginForm] = useState(!isLoggedIn);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      setShowLoginForm(false);
    }
  };

  if (!isLoggedIn && showLoginForm) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign In</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign In
                </button>
                <div className="text-center">
                  <small className="text-muted">
                    Demo: Use any email and password to sign in
                  </small>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h2>Access Your Account</h2>
            <p className="text-muted">Sign in to manage your account and orders.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowLoginForm(true)}
            >
              Sign In
            </button>
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
              <h1 className="h2 mb-4">Your Account</h1>
            </div>
          </div>

          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <User size={40} className="text-primary me-3" />
                    <div>
                      <h6 className="mb-0">{user?.firstName} {user?.lastName}</h6>
                      <small className="text-muted">{user?.email}</small>
                    </div>
                  </div>
                  <hr />
                  <nav className="nav flex-column">
                    <button 
                      className={`nav-link text-start border-0 bg-transparent ${activeTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User size={16} className="me-2" />
                      Profile
                    </button>
                    <button 
                      className={`nav-link text-start border-0 bg-transparent ${activeTab === 'addresses' ? 'active' : ''}`}
                      onClick={() => setActiveTab('addresses')}
                    >
                      <MapPin size={16} className="me-2" />
                      Addresses
                    </button>
                    <button 
                      className={`nav-link text-start border-0 bg-transparent ${activeTab === 'payment' ? 'active' : ''}`}
                      onClick={() => setActiveTab('payment')}
                    >
                      <CreditCard size={16} className="me-2" />
                      Payment Methods
                    </button>
                    <Link to="/orders" className="nav-link">
                      <Package size={16} className="me-2" />
                      Order History
                    </Link>
                    <hr />
                    <button 
                      className="nav-link text-start border-0 bg-transparent text-danger"
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Profile Information</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={user?.firstName || ''}
                            onChange={(e) => updateProfile({ firstName: e.target.value })}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={user?.lastName || ''}
                            onChange={(e) => updateProfile({ lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={user?.email || ''}
                          onChange={(e) => updateProfile({ email: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={user?.phone || ''}
                          onChange={(e) => updateProfile({ phone: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Shipping Addresses</h5>
                    <button className="btn btn-primary btn-sm">
                      <Plus size={16} className="me-1" />
                      Add Address
                    </button>
                  </div>
                  <div className="card-body">
                    {user?.addresses.map((address, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{address.name}</h6>
                              <p className="mb-1">{address.street}</p>
                              <p className="mb-1">{address.city}, {address.state} {address.zipCode}</p>
                              {address.phone && <p className="mb-0 text-muted">{address.phone}</p>}
                            </div>
                            <div className="dropdown">
                              <button className="btn btn-link" data-bs-toggle="dropdown">
                                <Settings size={16} />
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button className="dropdown-item">
                                    <Edit size={14} className="me-2" />
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button 
                                    className="dropdown-item text-danger"
                                    onClick={() => removeAddress(index)}
                                  >
                                    <Trash2 size={14} className="me-2" />
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Payment Methods</h5>
                    <button className="btn btn-primary btn-sm">
                      <Plus size={16} className="me-1" />
                      Add Card
                    </button>
                  </div>
                  <div className="card-body">
                    {user?.paymentMethods.map((method, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <CreditCard size={24} className="me-3 text-primary" />
                              <div>
                                <h6 className="mb-0">
                                  {method.cardBrand} ending in {method.lastFourDigits}
                                </h6>
                                <small className="text-muted">
                                  {method.type === 'credit' ? 'Credit Card' : 'Debit Card'}
                                </small>
                              </div>
                            </div>
                            <div className="dropdown">
                              <button className="btn btn-link" data-bs-toggle="dropdown">
                                <Settings size={16} />
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button className="dropdown-item">
                                    <Edit size={14} className="me-2" />
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item text-danger">
                                    <Trash2 size={14} className="me-2" />
                                    Remove
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}