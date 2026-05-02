'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, Star, Heart } from 'lucide-react'
import { useCartStore } from '@/hooks/useCart'
import { toast } from '@/components/ui/Toaster'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'horizontal'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast(`${product.name} added to cart!`, 'success')
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
        <Link href={`/product/${product.id}`} className="relative w-24 h-24 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
          {product.badge && (
            <span className="absolute top-1 left-1 px-2 py-0.5 bg-accent-orange text-white text-xs font-medium rounded-full">
              {product.badge}
            </span>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-dark-900 truncate">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-lg font-bold text-dark-900">${product.price}</span>
              <span className="text-sm text-gray-400">/{product.unit}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-dark-900 text-white rounded-xl hover:bg-dark-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-accent-orange text-white text-xs font-semibold rounded-full">
              {product.badge}
            </span>
          )}
          <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-dark-900 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-dark-900">${product.price}</span>
              <span className="text-sm text-gray-400">/{product.unit}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="p-2.5 bg-dark-900 text-white rounded-xl hover:bg-accent-orange transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </Link>
    </div>
  )
}