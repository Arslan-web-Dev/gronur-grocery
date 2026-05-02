export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  unit: string
  category: string
  subcategory: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  status: 'placed' | 'pending' | 'confirmed' | 'processing' | 'delivered'
  items: CartItem[]
  total: number
  deliveryAddress: Address
  paymentMethod: PaymentMethod
  createdAt: string
  estimatedDelivery: string
  trackingSteps: TrackingStep[]
}

export interface Address {
  id: string
  label: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay'
  label: string
  last4?: string
  expiryDate?: string
  isDefault: boolean
}

export interface TrackingStep {
  status: string
  time: string
  completed: boolean
  description: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  productCount: number
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}
