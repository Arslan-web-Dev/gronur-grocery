'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastListeners: ((toast: Toast) => void)[] = []

export function toast(message: string, type: ToastType = 'info') {
  const newToast = { id: Math.random().toString(36).substr(2, 9), message, type }
  toastListeners.forEach((listener) => listener(newToast))
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (newToast: Toast) => {
      setToasts((prev) => [...prev, newToast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
      }, 3000)
    }
    toastListeners.push(listener)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg animate-slide-up",
            t.type === 'success' && "bg-green-50 text-green-800 border border-green-200",
            t.type === 'error' && "bg-red-50 text-red-800 border border-red-200",
            t.type === 'info' && "bg-blue-50 text-blue-800 border border-blue-200"
          )}
        >
          {t.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
          {t.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
          <span className="text-sm font-medium">{t.message}</span>
          <button
            onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
            className="ml-2 hover:opacity-70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}