import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Button = forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: 'bg-accent-primary text-bg-primary hover:bg-accent-hover shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-bg-secondary text-text-primary border border-bg-elevated hover:bg-bg-hover shadow-sm',
    ghost: 'hover:bg-bg-hover text-text-secondary hover:text-text-primary',
    danger: 'bg-semantic-error text-white hover:bg-red-600',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
})

Button.displayName = 'Button'
export default Button
