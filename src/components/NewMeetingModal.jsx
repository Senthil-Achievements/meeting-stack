import { useState } from 'react'
import { X } from 'lucide-react'
import { useMeetings } from '../hooks/useMeetings'
import Button from './ui/Button'
import Input from './ui/Input'

export default function NewMeetingModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('')
  const { createMeeting } = useMeetings()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    createMeeting.mutate(
      { title, date, time: time || null },
      {
        onSuccess: () => {
          onClose()
          setTitle('')
          setTime('')
          // Date stays as today
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-bg-elevated w-full max-w-md rounded-2xl border border-bg-hover shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-bg-hover">
          <h2 className="text-xl font-bold">New Meeting</h2>
          <button 
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Title"
            placeholder="Weekly Team Sync"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Input
              label="Time (Optional)"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMeeting.isPending}>
              {createMeeting.isPending ? 'Creating...' : 'Create Meeting'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
