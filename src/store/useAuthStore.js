import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },
  signUp: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  },
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) throw error
  },
  updateProfile: async ({ full_name }) => {
    const { user } = get()
    if (!user) throw new Error('User not authenticated')
    
    // Check rate limit (fetched via separate query or assuming we have profile loaded)
    // We'll fetch the profile fresh to be safe
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('last_name_change_at')
      .eq('id', user.id)
      .single()
      
    if (fetchError) throw fetchError

    if (profile.last_name_change_at) {
      const lastChange = new Date(profile.last_name_change_at)
      const now = new Date()
      const diffTime = Math.abs(now - lastChange)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 30) {
        const remaining = 30 - diffDays
        throw new Error(`Remaining days after you change again: ${remaining} days`)
      }
    }

    const { error } = await supabase.auth.updateUser({
      data: { full_name }
    })
    if (error) throw error

    // Update profile table + timestamp
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        full_name,
        last_name_change_at: new Date().toISOString()
      })
      .eq('id', user.id)
    
    if (profileError) throw profileError
    
    // Refresh session to get new metadata
    const { data: { session } } = await supabase.auth.refreshSession()
    set({ user: session.user, session })
  },

  updatePassword: async (newPassword) => {
    const { user } = get()
    if (!user) throw new Error('User not authenticated')
    
    // Fetch profile for rate limit check
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('last_password_change_at')
      .eq('id', user.id)
      .single()
      
    if (fetchError) throw fetchError

    if (profile.last_password_change_at) {
      const lastChange = new Date(profile.last_password_change_at)
      const now = new Date()
      const diffTime = Math.abs(now - lastChange)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 30) {
        const remaining = 30 - diffDays
        throw new Error(`Remaining days after you change again: ${remaining} days`)
      }
    }
    
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error

    // Update timestamp
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ last_password_change_at: new Date().toISOString() })
      .eq('id', user.id)
      
    if (profileError) throw profileError
  },
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },
}))
