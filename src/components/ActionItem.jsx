import { Trash2, Check } from 'lucide-react'
import { useState } from 'react'

export default function ActionItem({ item, onToggle, onDelete }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group flex items-center gap-3 p-3 rounded-xl bg-bg-primary border border-bg-elevated hover:border-accent-primary/30 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => onToggle(item.id, !item.is_completed)}
        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
          item.is_completed 
            ? 'bg-accent-primary border-accent-primary' 
            : 'border-text-muted hover:border-accent-primary'
        }`}
      >
        {item.is_completed && <Check size={14} className="text-white" />}
      </button>

      <span className={`flex-1 text-sm ${item.is_completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
        {item.text}
      </span>

      <button
        onClick={() => onDelete(item.id)}
        className={`p-1.5 rounded-lg text-text-muted hover:text-semantic-error hover:bg-semantic-error/10 transition-all ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        title="Delete Item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
