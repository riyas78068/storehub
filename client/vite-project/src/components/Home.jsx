import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../services/productService'

 function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts()
      console.log('API Response:', response)
      const allProducts = Array.isArray(response) ? response : (response?.data || [])
      // Show only first 3 products as featured
      setProducts(allProducts.slice(0, 3))
    } catch (err) {
      setError('Failed to load featured products')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-34 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Discover Amazing Products</h1>
            <p className="text-lg text-gray-600 mb-6">Shop the latest trends with exclusive deals and free shipping on orders over $50.</p>
            <div className="flex gap-4">
              <Link to="/product" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Shop Now</Link>
              <Link to="/contact" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium">Learn More</Link>
            </div>
          </div>
          <div className="text-center">
            <div className="text-9xl">🛒</div>
            <p className="text-gray-500 mt-4">Welcome to StorHub</p>
          </div>
        </div>
      </section>

     

     

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 my-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-6 text-blue-100">Get exclusive deals and updates delivered to your inbox</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-medium">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home; 