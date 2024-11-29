"use client"

import React, { createContext, useContext, useState } from 'react'
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast'

type ToastContextType = {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([])

  const showToast = (message: string) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast key={toast.id}>
            <p>{toast.message}</p>
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

