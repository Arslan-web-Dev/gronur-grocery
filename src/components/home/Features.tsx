'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, Clock, Leaf, RefreshCw, Headphones } from 'lucide-react'

const features_list = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery on all orders over $50',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure payment methods',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Clock,
    title: '30 Min Delivery',
    description: 'Fast delivery to your doorstep',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: Leaf,
    title: 'Fresh Products',
    description: '100% fresh and organic products',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Hassle-free 30-day returns',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round the clock customer service',
    color: 'bg-pink-100 text-pink-600'
  }
]

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-900">Why Choose Gronur</h2>
          <p className="text-gray-500 mt-2">We provide the best services for our customers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features_list.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-dark-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}