'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, MapPin, ChevronRight, Check, Truck, Shield, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/hooks/useCart'
import { toast } from '@/components/ui/Toaster'
import { formatPrice } from '@/lib/utils'

const addresses = [
  {
    id: '1',
    label: 'Home',
    street: '123 Fresh Market St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    isDefault: true
  },
  {
    id: '2',
    label: 'Office',
    street: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zip: '10002',
    isDefault: false
  }
]

const paymentMethods = [
  { id: '1', type: 'card', label: 'Mastercard', last4: '4242', isDefault: true },
  { id: '2', type: 'card', label: 'Visa', last4: '8888', isDefault: false }
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id)
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id)
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Your cart is empty</h2>
          <Link href="/products" className="text-primary-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getTotalPrice()
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    toast('Order placed successfully!', 'success')
    router.push('/orders')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 1 ? 'bg-dark-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Address</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 2 ? 'bg-dark-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <CreditCard className="w-4 h-4" />
              <span className="text-sm font-medium">Payment</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= 3 ? 'bg-dark-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Confirm</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-bold text-dark-900 mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? 'border-dark-900 bg-dark-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-primary-600" />
                          <span className="font-semibold text-dark-900">{address.label}</span>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{address.street}</p>
                        <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full py-4 bg-dark-900 text-white rounded-xl font-semibold hover:bg-accent-orange transition-colors"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {/* Payment Selection */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-bold text-dark-900 mb-6">Payment Method</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? 'border-dark-900 bg-dark-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                      />
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-dark-900">{method.label}</span>
                        <p className="text-sm text-gray-500">**** {method.last4}</p>
                      </div>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full">Default</span>
                      )}
                    </label>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-dark-900 text-white rounded-xl font-semibold hover:bg-accent-orange transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* Order Confirmation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-bold text-dark-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-dark-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg text-dark-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-accent-orange text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-dark-900 mb-4">Order Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-dark-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Truck className="w-5 h-5" />
                  <span>Delivery in 20-25 minutes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Shield className="w-5 h-5" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}