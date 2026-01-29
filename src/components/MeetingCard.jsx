import { Calendar, ChevronRight, CheckSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function MeetingCard({ meeting }) {
  // Mock progress data for now since we don't have action items joined yet
  const actionItemsTotal = 0
  const actionItemsCompleted = 0
  const progress = actionItemsTotal > 0 ? (actionItemsCompleted / actionItemsTotal) * 100 : 0

  return (
    <Link
      to={`/meetings/${meeting.id}`}
      className="group bg-bg-secondary rounded-xl p-6 border border-bg-elevated hover:border-accent-primary/50 transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-accent-primary transition-colors">
          {meeting.title}
        </h3>
        <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-primary transition-colors opacity-0 group-hover:opacity-100" />
      </div>

      <div className="flex items-center text-text-secondary text-sm mb-6">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{format(new Date(meeting.date), 'MMMM d, yyyy')}</span>
        {meeting.time && (
          <span className="ml-2 px-2 border-l border-bg-elevated">
            {format(new Date(`2000-01-01T${meeting.time}`), 'h:mm a')}
          </span>
        )}
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
          <div className="flex items-center">
            <CheckSquare className="w-4 h-4 mr-2" />
            <span>Action Items</span>
          </div>
          <span className={progress === 100 ? 'text-semantic-success' : ''}>
            {actionItemsCompleted}/{actionItemsTotal}
          </span>
        </div>
        <div className="h-1.5 w-full bg-bg-elevated rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  )
}
