import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { toast } from 'react-hot-toast'

export function useActionItems(meetingId) {
  const queryClient = useQueryClient()

  const { data: actionItems, isLoading } = useQuery({
    queryKey: ['actionItems', meetingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('action_items')
        .select('*')
        .eq('meeting_id', meetingId)
        .order('created_at', { ascending: true })
      
      if (error) throw error
      return data
    },
    enabled: !!meetingId
  })

  const addActionItem = useMutation({
    mutationFn: async (text) => {
      const { data, error } = await supabase
        .from('action_items')
        .insert([{ meeting_id: meetingId, text }])
        .select()
      
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['actionItems', meetingId])
      toast.success('Task added')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const toggleActionItem = useMutation({
    mutationFn: async ({ id, is_completed }) => {
      const { error } = await supabase
        .from('action_items')
        .update({ is_completed })
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['actionItems', meetingId])
    },
    onError: (error) => {
      toast.error('Failed to update task')
    }
  })

  const deleteActionItem = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('action_items')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['actionItems', meetingId])
      toast.success('Task deleted')
    }
  })

  return {
    actionItems,
    isLoading,
    addActionItem,
    toggleActionItem,
    deleteActionItem
  }
}
