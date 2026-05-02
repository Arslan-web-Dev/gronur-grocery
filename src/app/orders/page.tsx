'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, ChevronRight, Clock, CheckCircle, Truck, MapPin } from 'lucide-react'

const orders = [
  {
    id: 'ORD-123456789',
    status: 'delivered',
    date: '2026-04-28T14:30:00',
    total: 45.50,
    items: 3,
    products: [
      { name: 'Fresh Orange', quantity: 2, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=100' },
      { name: 'Strawberry', quantity: 1, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100' }
    ]
  },
  {
    id: 'ORD-987654321',
    status: 'processing',
    date: '2026-05-01T09:15:00',
    total: 78.25,
    items: 5,
    products: [
      { name: 'Dragon Fruit', quantity: 1, image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=100' },
      { name: 'Capsicum', quantity: 2, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbbad0e?w=100' }
    ]
  },
  {
    id: 'ORD-456789123',
    status: 'confirmed',
    date: '2026-05-01T16:45:00',
    total: 32.80,
    items: 2,
    products: [
      { name: 'Fresh Lemon', quantity: 3, image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=100' }
    ]
  }
]

const statusConfig = {
  placed: { color: 'bg-gray-100 text-gray-600', icon: Clock, label: 'Order Placed' },
  pending: { color: 'bg-yellow-100 text-yellow-600', icon: Clock, label: 'Pending' },
  confirmed: { color: 'bg-blue-100 text-blue-600', icon: CheckCircle, label: 'Confirmed' },
  processing: { color: 'bg-purple-100 text-purple-600', icon: Package, label: 'Processing' },
  delivered: { color: 'bg-green-100 text-green-600', icon: Truck, label: 'Delivered' }
}

export default function OrdersPage() {
  const [filter, setFilter] = useState('all')

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          <p className="text-gray-300">Track and manage your orders</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'placed', 'processing', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-dark-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const status = statusConfig[order.status as keyof typeof statusConfig]
            const StatusIcon = status.icon

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/orders/${order.id}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-semibold text-dark-900">{order.id}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{status.label}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex -space-x-2">
                        {order.products.map((product, i) => (
                          <img
                            key={i}
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{order.items} items</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        <p className="font-bold text-lg text-dark-900">${order.total.toFixed(2)}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}