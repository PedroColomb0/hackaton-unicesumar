"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-white text-gray-900",
        destructive: "border-red-500 bg-red-50 text-red-900",
        success: "border-green-500 bg-green-50 text-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// Corrigindo a interface para evitar conflito com a propriedade 'title'
interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string
  className?: string
  title?: React.ReactNode
  description?: React.ReactNode
  onClose?: () => void
  // Adicionando outras propriedades HTML que possamos precisar
  role?: string
  style?: React.CSSProperties
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} role="alert" {...props}>
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-70 transition-opacity hover:text-gray-900 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  },
)
Toast.displayName = "Toast"

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

const ToastViewport: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {children}
    </div>
  )
}

type ToastActionElement = React.ReactElement

export { type ToastProps, type ToastActionElement, ToastProvider, ToastViewport, Toast }
