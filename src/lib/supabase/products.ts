import { createClient } from '@/lib/supabase/client'
import type { Category, Product } from '@/types'
import fallbackCatalog from '@/data/products.json'

export type DbProduct = {
  id: string
  name: string
  description: string
  price: number
  original_price: number | null
  unit: string
  category_id: string
  subcategory: string | null
  image: string
  rating: number
  reviews: number
  in_stock: boolean
  badge: string | null
  nutrition: Product['nutrition'] | null
}

export type DbCategory = {
  id: string
  name: string
  icon: string
  color: string
  product_count: number
}

export function mapDbProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    ...(row.original_price != null ? { originalPrice: Number(row.original_price) } : {}),
    unit: row.unit,
    category: row.category_id,
    subcategory: row.subcategory ?? '',
    image: row.image,
    rating: Number(row.rating),
    reviews: row.reviews,
    inStock: row.in_stock,
    ...(row.badge ? { badge: row.badge } : {}),
    ...(row.nutrition ? { nutrition: row.nutrition } : {}),
  }
}

export function mapDbCategory(row: DbCategory): Category {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    color: row.color,
    productCount: row.product_count,
  }
}

function getFallbackProducts(): Product[] {
  return fallbackCatalog.products as Product[]
}

function getFallbackCategories(): Category[] {
  return fallbackCatalog.categories as Category[]
}

export async function fetchProductsFromSupabase(): Promise<{
  products: Product[]
  fromSupabase: boolean
}> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('name')

  if (error) {
    console.warn('Supabase products fetch failed:', error.message)
    return { products: getFallbackProducts(), fromSupabase: false }
  }

  if (!data?.length) {
    return { products: getFallbackProducts(), fromSupabase: false }
  }

  return { products: (data as DbProduct[]).map(mapDbProduct), fromSupabase: true }
}

export async function fetchCategoriesFromSupabase(): Promise<{
  categories: Category[]
  fromSupabase: boolean
}> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.warn('Supabase categories fetch failed:', error.message)
    return { categories: getFallbackCategories(), fromSupabase: false }
  }

  if (!data?.length) {
    return { categories: getFallbackCategories(), fromSupabase: false }
  }

  return { categories: (data as DbCategory[]).map(mapDbCategory), fromSupabase: true }
}

export async function fetchProductByIdFromSupabase(id: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) {
    return getFallbackProducts().find((p) => p.id === id) ?? null
  }

  return mapDbProduct(data as DbProduct)
}
