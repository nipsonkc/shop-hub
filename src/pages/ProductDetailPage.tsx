import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { sampleProducts } from '@/data/sampleProducts';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const product = sampleProducts.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h1>Product Not Found</h1>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = sampleProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      
      <main className="flex-grow-1">
        <div className="container py-4">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              {product.categoryPath.map((category, index) => (
                <li key={index} className="breadcrumb-item">
                  <Link 
                    to={`/c/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-decoration-none"
                  >
                    {category}
                  </Link>
                </li>
              ))}
              <li className="breadcrumb-item active" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="row">
            {/* Product Images */}
            <div className="col-lg-6 mb-4">
              <div className="sticky-top" style={{ top: '100px' }}>
                <div className="card">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <small className="text-muted">Click to see full view</small>
                  </div>
                </div>
                {product.images.length > 1 && (
                  <div className="d-flex gap-2 mt-3">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`btn p-0 border ${selectedImage === index ? 'border-primary' : ''}`}
                        onClick={() => setSelectedImage(index)}
                        style={{ width: '80px', height: '80px' }}
                      >
                        <img 
                          src={image} 
                          alt={`${product.title} ${index + 1}`}
                          className="w-100 h-100 object-fit-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="col-lg-6">
              <div className="mb-3">
                <h1 className="h2">{product.title}</h1>
                <p className="text-muted">by {product.seller}</p>
              </div>

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <div className="text-warning me-2">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="me-2">{product.rating}</span>
                <span className="text-muted">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <span className="h3 text-primary mb-0">${product.price}</span>
                  {product.originalPrice && (
                    <span className="h5 text-muted text-decoration-line-through ms-3 mb-0">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <small className="text-success">
                    You save ${(product.originalPrice - product.price).toFixed(2)} 
                    ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                  </small>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5>About this item</h5>
                <ul className="list-unstyled">
                  {product.descriptionBullets.map((bullet, index) => (
                    <li key={index} className="mb-2">• {bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Options */}
              {product.options && Object.keys(product.options).length > 0 && (
                <div className="mb-4">
                  {Object.entries(product.options).map(([optionName, values]) => (
                    <div key={optionName} className="mb-3">
                      <label className="form-label fw-bold">{optionName}:</label>
                      <div className="d-flex gap-2 flex-wrap">
                        {values.map((value: string) => (
                          <button
                            key={value}
                            className={`btn btn-outline-primary ${
                              selectedOptions[optionName] === value ? 'active' : ''
                            }`}
                            onClick={() => handleOptionChange(optionName, value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <div>
                    {product.stock < 10 && (
                      <div className="alert alert-warning py-2">
                        Only {product.stock} left in stock – order soon
                      </div>
                    )}
                    <p className="text-success mb-0">✓ In Stock</p>
                  </div>
                ) : (
                  <p className="text-danger">Out of Stock</p>
                )}
              </div>

              {/* Delivery Info */}
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <Truck className="me-2" size={18} />
                  <span>Delivery to West Haven, CT</span>
                </div>
                {product.shipping.deliveryWindows.map((window, index) => (
                  <p key={index} className="text-muted mb-1">{window}</p>
                ))}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="form-label">Quantity:</label>
                  <select 
                    className="form-select"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  >
                    {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-8 d-flex align-items-end">
                  <div className="d-grid gap-2 w-100">
                    <button 
                      className="btn btn-warning btn-lg"
                      disabled={product.stock === 0}
                    >
                      Buy Now
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart size={18} className="me-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="row text-center">
                <div className="col-4">
                  <Shield className="text-success mb-2" size={24} />
                  <small className="d-block">Secure Payment</small>
                </div>
                <div className="col-4">
                  <Truck className="text-success mb-2" size={24} />
                  <small className="d-block">Free Shipping</small>
                </div>
                <div className="col-4">
                  <RotateCcw className="text-success mb-2" size={24} />
                  <small className="d-block">Easy Returns</small>
                </div>
              </div>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Product Specifications</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="col-md-6 mb-2">
                        <strong>{key}:</strong> {value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <h3 className="mb-4">Related Products</h3>
                <div className="row g-4">
                  {relatedProducts.map(relatedProduct => (
                    <div key={relatedProduct.id} className="col-md-3">
                      <Link to={`/p/${relatedProduct.slug}`} className="text-decoration-none">
                        <div className="card h-100">
                          <img 
                            src={relatedProduct.images[0]} 
                            alt={relatedProduct.title}
                            className="card-img-top"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <div className="card-body">
                            <h6 className="card-title text-truncate">{relatedProduct.title}</h6>
                            <div className="d-flex align-items-center mb-2">
                              <span className="text-warning me-1">★★★★★</span>
                              <small className="text-muted">({relatedProduct.reviewCount})</small>
                            </div>
                            <span className="h5 text-primary">${relatedProduct.price}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}