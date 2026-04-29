import React, { useState } from 'react'

export function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: '💰', change: '+12%' },
    { label: 'Orders', value: '1,248', icon: '📦', change: '+5%' },
    { label: 'Products', value: '856', icon: '🛍️', change: '+23' },
    { label: 'Users', value: '5,342', icon: '👥', change: '+89' },
  ]

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', amount: '$89.99', status: 'Delivered', date: '2024-04-20' },
    { id: '#ORD002', customer: 'Jane Smith', amount: '$199.99', status: 'Processing', date: '2024-04-20' },
    { id: '#ORD003', customer: 'Mike Johnson', amount: '$45.99', status: 'Pending', date: '2024-04-19' },
    { id: '#ORD004', customer: 'Sarah Williams', amount: '$599.99', status: 'Delivered', date: '2024-04-19' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Manage your store and view analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {['dashboard', 'products', 'orders', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 font-medium text-sm transition ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                      <p className="text-green-600 text-sm mt-2">{stat.change} from last month</p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Chart</h3>
                <div className="h-64 bg-gradient-to-t from-blue-100 to-transparent rounded flex items-center justify-center text-gray-500">
                  Chart would go here
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
                <div className="space-y-3">
                  {['Wireless Headphones', 'Smart Watch', 'Camera Pro'].map((product, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-700">{product}</span>
                      <span className="text-blue-600 font-semibold">{Math.floor(Math.random() * 500)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Order ID</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Customer</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Amount</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-blue-600 font-medium">{order.id}</td>
                        <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                        <td className="py-3 px-4 text-gray-900 font-semibold">{order.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab !== 'dashboard' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
            <p className="text-gray-600">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management interface would go here</p>
          </div>
        )}
      </div>
    </div>
  )
}
