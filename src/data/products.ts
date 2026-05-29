import catalog from './products.json'
import type { Category, Product } from '@/types'

/** Local fallback catalog (also seeded to Supabase via migrations) */
export const products: Product[] = catalog.products as Product[]
export const categories: Category[] = catalog.categories as Category[]
