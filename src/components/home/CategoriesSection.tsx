'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Apple, Carrot, Milk, Croissant, Coffee, Cookie, ArrowRight } from 'lucide-react'
import { useCatalog } from '@/hooks/useCatalog'

const iconMap: Record<string, React.ReactNode> = {
  Apple: <Apple className="w-8 h-8" />,
  Carrot: <Carrot className="w-8 h-8" />,
  Milk: <Milk className="w-8 h-8" />,
  Croissant: <Croissant className="w-8 h-8" />,
  Coffee: <Coffee className="w-8 h-8" />,
  Cookie: <Cookie className="w-8 h-8" />,
}

export function CategoriesSection() {
  const { categories, loading } = useCatalog()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-dark-900">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Explore our wide range of fresh products</p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading && (
            <p className="col-span-full text-center text-gray-500 py-6">Loading categories…</p>
          )}
          {!loading && categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/categories/${category.id}`}
                className="group block p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {iconMap[category.icon]}
                </div>
                <h3 className="font-semibold text-dark-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.productCount} items</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}