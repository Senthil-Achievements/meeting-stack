import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useMeetings } from '../hooks/useMeetings'
import { useAuthStore } from '../store/useAuthStore'
import MeetingCard from '../components/MeetingCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
// Import NewMeetingModal (will create next)
import NewMeetingModal from '../components/NewMeetingModal'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { meetings, isLoading } = useMeetings()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredMeetings = meetings?.filter(meeting => 
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Meetings</h1>
          <p className="text-text-secondary">Welcome back, {user?.email}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search meetings..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap">
            <Plus className="w-5 h-5 mr-2" />
            New Meeting
          </Button>
        </div>
      </div>

      {meetings?.length === 0 ? (
        <div className="text-center py-20 bg-bg-secondary rounded-2xl border border-bg-elevated border-dashed">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-bold mb-2">No meetings yet</h2>
          <p className="text-text-secondary mb-6 max-w-sm mx-auto">
            Create your first meeting to start tracking notes and action items.
          </p>
          <Button onClick={() => setIsModalOpen(true)}>Create Meeting</Button>
        </div>
      ) : filteredMeetings?.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold mb-2">No results found</h2>
          <p className="text-text-secondary">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeetings?.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <NewMeetingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
