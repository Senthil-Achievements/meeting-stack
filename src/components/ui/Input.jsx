import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Input = forwardRef(({ className, error, label, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full bg-bg-secondary text-text-primary border border-bg-elevated rounded-xl px-4 py-3 outline-none transition-all focus:border-accent-primary focus:ring-1 focus:ring-accent-primary placeholder:text-text-muted hover:border-text-muted/50',
          error && 'border-semantic-error focus:border-semantic-error focus:ring-semantic-error',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-semantic-error mt-1">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
