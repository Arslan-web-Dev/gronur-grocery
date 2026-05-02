'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Package, Heart, CreditCard, LogOut, Camera, Edit3 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/Toaster'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setName(user.user_metadata?.full_name || '')
        setPhone(user.user_metadata?.phone || '')
      }
    }
    getUser()
  }, [])

  const handleUpdateProfile = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name, phone }
    })
    if (error) {
      toast(error.message, 'error')
    } else {
      toast('Profile updated successfully!', 'success')
      setIsEditing(false)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast('Logged out successfully', 'success')
    router.push('/')
    router.refresh()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-gray-300 mt-2">Manage your account settings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 bg-dark-900 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-accent-orange text-white rounded-full hover:bg-orange-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-dark-900">{name || 'User'}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">12</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">5</p>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">3</p>
                  <p className="text-xs text-gray-500">Addresses</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <Package className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-dark-900">My Orders</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-dark-900">Wishlist</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-dark-900">Payment Methods</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dark-900">Personal Information</h2>
                <button
                  onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-dark-900 text-white rounded-xl hover:bg-accent-orange transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditing}
                      placeholder="Add phone number"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
              <h2 className="text-xl font-bold text-dark-900 mb-6">Saved Addresses</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border-2 border-dark-900 rounded-xl bg-dark-50">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-dark-900">Home</span>
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full">Default</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">123 Fresh Market St, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-dark-900">Office</span>
                    <p className="text-sm text-gray-600 mt-1">456 Business Ave, New York, NY 10002</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}