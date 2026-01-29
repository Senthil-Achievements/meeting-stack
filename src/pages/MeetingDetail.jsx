import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Save, Calendar, Clock, CheckSquare, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { useMeetings } from '../hooks/useMeetings'
import { useActionItems } from '../hooks/useActionItems'
import { supabase } from '../lib/supabase'
import { toast } from 'react-hot-toast'
import Button from '../components/ui/Button'
import ActionItem from '../components/ActionItem'

export default function MeetingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deleteMeeting } = useMeetings()
  const { actionItems, addActionItem, toggleActionItem, deleteActionItem } = useActionItems(id)
  
  const [meeting, setMeeting] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [newItemText, setNewItemText] = useState('')

  useEffect(() => {
    fetchMeeting()
  }, [id])

  const fetchMeeting = async () => {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setMeeting(data)
      setNotes(data.notes || '')
    } catch (error) {
      toast.error('Error loading meeting')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      await deleteMeeting.mutateAsync(id)
      navigate('/')
    }
  }

  const handleSaveNotes = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('meetings')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      toast.success('Notes saved')
    } catch (error) {
      console.error('Save error:', error)
      toast.error(`Failed to save notes: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!newItemText.trim()) return
    addActionItem.mutate(newItemText)
    setNewItemText('')
  }

  if (loading) {
    return (
      <div className="flex bg-bg-primary h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary"></div>
      </div>
    )
  }

  if (!meeting) return null

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-300 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content: Header + Notes */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="pl-0 hover:bg-transparent hover:text-accent-primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete} className="bg-bg-elevated border border-semantic-error/30 text-semantic-error hover:bg-semantic-error/10">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>

        <div className="bg-bg-secondary rounded-2xl p-8 border border-bg-elevated shadow-xl">
          <h1 className="text-3xl font-bold mb-4">{meeting.title}</h1>
          
          <div className="flex items-center gap-6 text-text-secondary mb-8 pb-8 border-b border-bg-elevated">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-accent-primary" />
              {format(new Date(meeting.date), 'EEEE, MMMM d, yyyy')}
            </div>
            {meeting.time && (
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-accent-primary" />
                {format(new Date(`2000-01-01T${meeting.time}`), 'h:mm a')}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Notes</h2>
              <Button 
                size="sm" 
                onClick={handleSaveNotes} 
                disabled={saving}
                className={saving ? 'opacity-70 cursor-not-allowed' : ''}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Notes'}
              </Button>
            </div>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your meeting notes here..."
              className="w-full h-[500px] bg-bg-primary p-6 rounded-xl border border-bg-elevated focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none resize-none leading-relaxed text-lg text-text-primary placeholder:text-text-muted transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sidebar: Action Items */}
      <div className="lg:col-span-1">
        <div className="bg-bg-secondary rounded-2xl p-6 border border-bg-elevated shadow-xl sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <CheckSquare className="text-accent-primary" />
            <h2 className="text-xl font-semibold">Action Items</h2>
          </div>

          <form onSubmit={handleAddItem} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add a new task..."
                className="w-full bg-bg-primary pl-4 pr-10 py-3 rounded-xl border border-bg-elevated focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all placeholder:text-text-muted"
              />
              <button 
                type="submit"
                disabled={!newItemText.trim() || addActionItem.isPending}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-accent-primary text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {actionItems?.length === 0 && (
              <div className="text-center text-text-secondary py-8 border-2 border-dashed border-bg-elevated rounded-xl">
                <p>No action items yet</p>
              </div>
            )}
            
            {actionItems?.map(item => (
              <ActionItem 
                key={item.id} 
                item={item} 
                onToggle={(id, status) => toggleActionItem.mutate({ id, is_completed: status })}
                onDelete={(id) => deleteActionItem.mutate(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
