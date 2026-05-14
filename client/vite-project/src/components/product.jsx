import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../services/productService'

 function Product() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [priceRange, setPriceRange] = useState(1000)
  const [sortBy, setSortBy] = useState('Most Popular')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts()
      console.log('API Response:', response)
      const allProducts = Array.isArray(response) ? response : (response?.data || [])
      setProducts(allProducts)
      applyFilters(allProducts, priceRange, sortBy)
    } catch (err) {
      setError('Failed to load products')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = (productsToFilter, price, sort) => {
    let filtered = productsToFilter.filter(product => {
      const productPrice = parseFloat(product.price) || 0
      return productPrice <= price
    })

    // Apply sorting
    switch (sort) {
      case 'Price: Low to High':
        filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0))
        break
      case 'Price: High to Low':
        filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0))
        break
      case 'Highest Rated':
        filtered.sort((a, b) => (parseFloat(b.product_rating) || 0) - (parseFloat(a.product_rating) || 0))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value)
    setPriceRange(newPrice)
    applyFilters(products, newPrice, sortBy)
  }

  const handleSortChange = (e) => {
    const newSort = e.target.value
    setSortBy(newSort)
    applyFilters(products, priceRange, newSort)
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our wide range of premium products</p>
        </div>

        {/* Filters and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Category Filter */}
        
          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full" 
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>$0</span>
              <span>${priceRange}</span>
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
            <select 
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.product_id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="relative bg-gray-100 h-40 flex items-center justify-center group overflow-hidden">
                  {product.product_image ? (
                    <img src={product.product_image} alt={product.product_name} className="w-full h-full object-cover group-hover:scale-110 transition transform" onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Product'} />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">Sale</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">{product.product_name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-1 mt-1">{product.product_brand}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    <span className="text-xs text-gray-500">⭐ {product.product_rating || 'N/A'}</span>
                  </div>
                  
                  <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">Add to Cart</button>
                  <Link to="/product" className="w-full mt-2 px-3 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium text-sm block text-center">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default Product