import React, { useState, useEffect } from 'react'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'

export default function Addproduct() {
  const [formData, setFormData] = useState({
    product_name: '',
    product_image: '',
    product_discription: '',
    product_rating: '',
    product_brand: '',
    price: '',
  })

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getAllProducts()
      setProducts(response.data || [])
    } catch (err) {
      setError('Failed to fetch products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    if (!formData.product_name.trim()) {
      setError('Product name is required')
      return false
    }
    if (!formData.price.trim()) {
      setError('Price is required')
      return false
    }
    if (isNaN(formData.price) || Number(formData.price) < 0) {
      setError('Price must be a valid positive number')
      return false
    }
    if (!formData.product_brand.trim()) {
      setError('Brand is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      if (editingId) {
        // Update existing product
        await updateProduct(editingId, formData)
        setSuccess('Product updated successfully!')
        setEditingId(null)
      } else {
        // Create new product
        await createProduct(formData)
        setSuccess('Product added successfully!')
      }

      // Reset form and refresh products
      setFormData({
        product_name: '',
        product_image: '',
        product_discription: '',
        product_rating: '',
        product_brand: '',
        price: '',
      })
      fetchProducts()
    } catch (err) {
      setError(editingId ? 'Failed to update product' : 'Failed to add product')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (product) => {
    setFormData({
      product_name: product.product_name,
      product_image: product.product_image,
      product_discription: product.product_discription,
      product_rating: product.product_rating,
      product_brand: product.product_brand,
      price: product.price,
    })
    setEditingId(product.product_id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true)
      setError(null)
      try {
        await deleteProduct(id)
        setSuccess('Product deleted successfully!')
        fetchProducts()
      } catch (err) {
        setError('Failed to delete product')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCancel = () => {
    setFormData({
      product_name: '',
      product_image: '',
      product_discription: '',
      product_rating: '',
      product_brand: '',
      price: '',
    })
    setEditingId(null)
    setError(null)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h1>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Product Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="product_brand"
                    value={formData.product_brand}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="product_rating"
                    value={formData.product_rating}
                    onChange={handleInputChange}
                    placeholder="Enter rating (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Product Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image URL
                  </label>
                  <input
                    type="url"
                    name="product_image"
                    value={formData.product_image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="product_discription"
                    value={formData.product_discription}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                {/* Image Preview */}
                {formData.product_image && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Preview
                    </label>
                    <img
                      src={formData.product_image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          'https://via.placeholder.com/200?text=Invalid+Image'
                      }}
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    {loading
                      ? 'Processing...'
                      : editingId
                      ? 'Update Product'
                      : 'Add Product'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Products List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search products by name or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {loading && products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchTerm ? 'No products match your search' : 'No products added yet'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Product
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Brand
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Price
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Rating
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.product_id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {product.product_image && (
                                <img
                                  src={product.product_image}
                                  alt={product.product_name}
                                  className="w-12 h-12 object-cover rounded"
                                  onError={(e) => {
                                    e.target.src =
                                      'https://via.placeholder.com/50?text=No+Image'
                                  }}
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {product.product_name}
                                </p>
                                {product.product_discription && (
                                  <p className="text-sm text-gray-500 truncate">
                                    {product.product_discription}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {product.product_brand}
                          </td>
                          <td className="py-3 px-4 font-semibold text-blue-600">
                            ${product.price}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {product.product_rating ? (
                              <span>⭐ {product.product_rating}</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(product.product_id)}
                                disabled={loading}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm disabled:bg-gray-400"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
