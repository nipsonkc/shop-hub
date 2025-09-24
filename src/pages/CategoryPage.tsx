import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { catalog, priceRanges, ratingSteps } from '@/data/taxonomy';
import { sampleProducts, filterProductsByPrice, filterProductsByRating } from '@/data/sampleProducts';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategoryPage() {
  const { category: categoryParam } = useParams();
  const { addToCart } = useCart();
  
  const categoryName = categoryParam ? 
    categoryParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
  
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Get category products and subcategories
  const subcategories = useMemo(() => {
    const categoryData = catalog[categoryName as keyof typeof catalog];
    return categoryData ? Object.keys(categoryData) : [];
  }, [categoryName]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = sampleProducts.filter(product => 
      product.categoryPath[0] === categoryName ||
      product.category === categoryName
    );

    if (selectedSubcategory !== 'All') {
      products = products.filter(product => 
        product.categoryPath[1] === selectedSubcategory
      );
    }

    products = filterProductsByPrice(products, selectedPriceRange);
    products = filterProductsByRating(products, selectedRating);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you'd sort by date
        break;
      default: // relevance
        break;
    }

    return products;
  }, [categoryName, selectedSubcategory, selectedPriceRange, selectedRating, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      
      <main className="flex-grow-1">
        <div className="container-fluid py-4">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {categoryName}
              </li>
            </ol>
          </nav>

          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Filters</h6>
                </div>
                <div className="card-body">
                  {/* Category Filter */}
                  <div className="mb-4">
                    <h6>Category</h6>
                    <div className="list-group list-group-flush">
                      <button
                        className={`list-group-item list-group-item-action border-0 ${
                          selectedSubcategory === 'All' ? 'active' : ''
                        }`}
                        onClick={() => setSelectedSubcategory('All')}
                      >
                        All {categoryName}
                      </button>
                      {subcategories.map(subcat => (
                        <button
                          key={subcat}
                          className={`list-group-item list-group-item-action border-0 ${
                            selectedSubcategory === subcat ? 'active' : ''
                          }`}
                          onClick={() => setSelectedSubcategory(subcat)}
                        >
                          {subcat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-4">
                    <h6>Price</h6>
                    <div className="list-group list-group-flush">
                      <button
                        className={`list-group-item list-group-item-action border-0 ${
                          selectedPriceRange === 'All' ? 'active' : ''
                        }`}
                        onClick={() => setSelectedPriceRange('All')}
                      >
                        All Prices
                      </button>
                      {priceRanges.map(range => (
                        <button
                          key={range}
                          className={`list-group-item list-group-item-action border-0 ${
                            selectedPriceRange === range ? 'active' : ''
                          }`}
                          onClick={() => setSelectedPriceRange(range)}
                        >
                          ${range.replace('-', ' - $').replace('+', '+')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-4">
                    <h6>Customer Reviews</h6>
                    <div className="list-group list-group-flush">
                      <button
                        className={`list-group-item list-group-item-action border-0 ${
                          selectedRating === 'All' ? 'active' : ''
                        }`}
                        onClick={() => setSelectedRating('All')}
                      >
                        All Ratings
                      </button>
                      {ratingSteps.map(rating => (
                        <button
                          key={rating}
                          className={`list-group-item list-group-item-action border-0 ${
                            selectedRating === rating ? 'active' : ''
                          }`}
                          onClick={() => setSelectedRating(rating)}
                        >
                          <Star size={14} className="text-warning me-1" />
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9 col-md-8">
              {/* Header and Sort */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 className="h3">{categoryName}</h1>
                  <p className="text-muted">{filteredProducts.length} results</p>
                </div>
                <div className="d-flex align-items-center">
                  <label className="me-2">Sort by:</label>
                  <select 
                    className="form-select w-auto"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {currentProducts.length > 0 ? (
                <>
                  <div className="row g-4">
                    {currentProducts.map(product => (
                      <div key={product.id} className="col-lg-4 col-md-6">
                        <div className="card h-100 product-card">
                          <div className="position-relative">
                            <Link to={`/p/${product.slug}`}>
                              <img 
                                src={product.images[0]} 
                                alt={product.title}
                                className="card-img-top"
                                style={{ height: '250px', objectFit: 'cover' }}
                              />
                            </Link>
                            <button className="btn btn-link position-absolute top-0 end-0 p-2">
                              <Heart size={20} />
                            </button>
                            {product.badges && product.badges.length > 0 && (
                              <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                                {product.badges[0]}
                              </span>
                            )}
                          </div>
                          <div className="card-body d-flex flex-column">
                            <small className="text-muted">{product.seller}</small>
                            <Link to={`/p/${product.slug}`} className="text-decoration-none">
                              <h6 className="card-title text-dark">{product.title}</h6>
                            </Link>
                            <div className="d-flex align-items-center mb-2">
                              <div className="text-warning me-2">
                                {'★'.repeat(Math.floor(product.rating))}
                                {'☆'.repeat(5 - Math.floor(product.rating))}
                              </div>
                              <small className="text-muted">({product.reviewCount})</small>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                              <span className="h5 text-primary mb-0">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-muted text-decoration-line-through ms-2">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="mt-auto">
                              <button 
                                className="btn btn-primary w-100"
                                onClick={() => handleAddToCart(product)}
                              >
                                <ShoppingCart size={16} className="me-1" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="mt-5">
                      <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                          <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button 
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              ) : (
                <div className="text-center py-5">
                  <h3>No products found</h3>
                  <p className="text-muted">Try adjusting your filters or search terms</p>
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