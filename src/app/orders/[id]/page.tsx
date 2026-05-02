'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, CheckCircle, Package, Truck, MapPin, Phone, MessageSquare, Star } from 'lucide-react'

const orderData = {
  id: 'ORD-123456789',
  status: 'delivered',
  date: '2026-04-28T14:30:00',
  total: 45.50,
  deliveryAddress: {
    name: 'Ronald Richards',
    street: '11 New Market, New work',
    city: 'New York',
    phone: '+1 555-0123'
  },
  trackingSteps: [
    { status: 'Order Placed', time: '9:30 AM', completed: true, description: 'Your order has been placed' },
    { status: 'Pending', time: '9:35 AM', completed: true, description: 'Order is being processed' },
    { status: 'Confirmed', time: '9:55 AM', completed: true, description: 'Order confirmed by store' },
    { status: 'Processing', time: '10:30 AM', completed: true, description: 'Items are being packed' },
    { status: 'Delivered', time: '11:45 AM', completed: true, description: 'Order delivered successfully' }
  ],
  products: [
    { name: 'Fresh Orange', price: 14.75, quantity: 2, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=200', total: 29.50 },
    { name: 'Strawberry', price: 12.75, quantity: 1, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200', total: 12.75 },
    { name: 'Lemon Fresh', price: 11.75, quantity: 1, image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=200', total: 11.75 }
  ]
}

export default function OrderDetailPage() {
  const params = useParams()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/orders" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-gray-300 mt-2">{orderData.id}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dark-900 mb-6">Order Status</h2>
              <div className="space-y-0">
                {orderData.trackingSteps.map((step, index) => (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step.completed ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      {index < orderData.trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-dark-900">{step.status}</h3>
                        <span className="text-sm text-gray-500">{step.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dark-900 mb-6">Products</h2>
              <div className="space-y-4">
                {orderData.products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-dark-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-dark-900">${product.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">${product.price}/unit</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark-900 mb-4">Delivery Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-dark-900">{orderData.deliveryAddress.name}</p>
                    <p className="text-sm text-gray-500">{orderData.deliveryAddress.street}</p>
                    <p className="text-sm text-gray-500">{orderData.deliveryAddress.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-600">{orderData.deliveryAddress.phone}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-dark-900">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-900 text-white rounded-xl font-semibold hover:bg-accent-orange transition-colors">
                <MessageSquare className="w-4 h-4" />
                Contact Support
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-colors">
                <Star className="w-4 h-4" />
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}