import Link from 'next/link'
import { Leaf, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-dark-900" />
              </div>
              <span className="text-xl font-bold">Gronur</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your daily grocery shop with fresh ingredients delivered right to your kitchen.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/categories/fruits" className="hover:text-white transition-colors">Fresh Fruits</Link></li>
              <li><Link href="/categories/vegetables" className="hover:text-white transition-colors">Vegetables</Link></li>
              <li><Link href="/categories/dairy" className="hover:text-white transition-colors">Dairy & Eggs</Link></li>
              <li><Link href="/categories/bakery" className="hover:text-white transition-colors">Bakery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@gronur.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Fresh Market St</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 Gronur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}