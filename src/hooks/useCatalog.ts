'use client'

import { useEffect, useState } from 'react'
import {
  fetchCategoriesFromSupabase,
  fetchProductsFromSupabase,
} from '@/lib/supabase/products'
import type { Category, Product } from '@/types'
import fallbackCatalog from '@/data/products.json'

type CatalogState = {
  products: Product[]
  categories: Category[]
  loading: boolean
  error: string | null
  source: 'supabase' | 'local'
}

const initialProducts = fallbackCatalog.products as Product[]
const initialCategories = fallbackCatalog.categories as Category[]

export function useCatalog(): CatalogState {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'supabase' | 'local'>('local')

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [productsResult, categoriesResult] = await Promise.all([
          fetchProductsFromSupabase(),
          fetchCategoriesFromSupabase(),
        ])

        if (cancelled) return

        const fromSupabase =
          productsResult.fromSupabase && categoriesResult.fromSupabase

        setProducts(productsResult.products)
        setCategories(categoriesResult.categories)
        setSource(fromSupabase ? 'supabase' : 'local')
        setError(null)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load catalog')
          setProducts(initialProducts)
          setCategories(initialCategories)
          setSource('local')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { products, categories, loading, error, source }
}
