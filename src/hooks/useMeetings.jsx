import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'

export function useMeetings() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  const { data: meetings, isLoading, error } = useQuery({
    queryKey: ['meetings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      return data
    },
    enabled: !!user,
  })

  const createMeeting = useMutation({
    mutationFn: async (newMeeting) => {
      const { data, error } = await supabase
        .from('meetings')
        .insert([{ ...newMeeting, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['meetings'])
      toast.success('Meeting created!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteMeeting = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('meetings')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['meetings'])
      toast.success('Meeting deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    meetings,
    isLoading,
    error,
    createMeeting,
    deleteMeeting,
  }
}
