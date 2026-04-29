import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function Cardview() {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('Black')
  const [selectedSize, setSelectedSize] = useState('M')

  const product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 189.99,
    originalPrice: 249.99,
    image: '🎧',
    rating: 4.8,
    reviews: 324,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life, premium sound quality, and comfortable design.',
    features: [
      'Active Noise Cancellation (ANC)',
      '30-hour battery life',
      'Bluetooth 5.0 connectivity',
      'Premium comfort fit',
      'Built-in microphone',
      'Foldable design'
    ],
    colors: ['Black', 'Silver', 'Gold', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    reviews_list: [
      { author: 'John D.', rating: 5, text: 'Excellent quality and comfort!', date: '2024-04-15' },
      { author: 'Sarah M.', rating: 4, text: 'Great sound, fast shipping', date: '2024-04-10' }
    ]
  }

  const relatedProducts = [
    { id: 2, name: 'Phone Case', price: 19.99, image: '📱', rating: 4.3 },
    { id: 3, name: 'USB Cable', price: 12.99, image: '🔌', rating: 4.7 },
    { id: 4, name: 'Screen Protector', price: 9.99, image: '📺', rating: 4.2 }
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/product" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center text-9xl mb-4">
              {product.image}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-100 h-20 rounded-lg flex items-center justify-center text-4xl">
                  {product.image}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-24%</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Colors</h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${selectedColor === color ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg border-2 transition font-semibold ${selectedSize === size ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3 w-fit border border-gray-300 rounded-lg p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <p className="text-green-600 font-semibold">✓ In Stock</p>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold">
                ❤️
              </button>
            </div>

            {/* Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>🚚</span> Free shipping on orders over $50
              </div>
              <div className="flex items-center gap-2">
                <span>♻️</span> 30-day money back guarantee
              </div>
              <div className="flex items-center gap-2">
                <span>🔒</span> Secure checkout and SSL encrypted
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="text-blue-600">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Product Specifications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Brand:</span>
                <span className="font-medium text-gray-900">Premium Audio</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model:</span>
                <span className="font-medium text-gray-900">PA-1000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Warranty:</span>
                <span className="font-medium text-gray-900">2 Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews_list.map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition font-medium">
            View All Reviews
          </button>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(prod => (
              <div key={prod.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="bg-gray-100 h-40 flex items-center justify-center text-5xl">
                  {prod.image}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{prod.name}</h3>
                  <p className="text-blue-600 font-bold">${prod.price}</p>
                  <div className="text-sm text-gray-500">⭐ {prod.rating}</div>
                  <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
