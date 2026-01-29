import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from 'react-hot-toast'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { User, Lock } from 'lucide-react'

export default function Settings() {
  const { user, updateProfile, updatePassword } = useAuthStore()
  const [fullName, setFullName] = useState('')
  const [loadingName, setLoadingName] = useState(false)
  const [password, setPassword] = useState('')
  const [loadingPass, setLoadingPass] = useState(false)

  // Load initial value
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name)
    }
  }, [user])

  const handleUpdateName = async (e) => {
    e.preventDefault()
    setLoadingName(true)
    try {
      await updateProfile({ full_name: fullName })
      toast.success('Name updated successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingName(false)
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setLoadingPass(true)
    try {
      await updatePassword(password)
      toast.success('Password updated successfully')
      setPassword('')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingPass(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Profile Section */}
      <section className="bg-bg-secondary p-8 rounded-2xl border border-bg-elevated shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-accent-primary" />
          <h2 className="text-xl font-semibold">Profile Information</h2>
        </div>
        
        <form onSubmit={handleUpdateName} className="space-y-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your Name"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-text-secondary">
              Note: You can only change your name once every 30 days.
            </span>
            <Button type="submit" disabled={loadingName} size="sm">
              {loadingName ? 'Saving...' : 'Save Name'}
            </Button>
          </div>
        </form>
      </section>

      {/* Security Section */}
      <section className="bg-bg-secondary p-8 rounded-2xl border border-bg-elevated shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-accent-primary" />
          <h2 className="text-xl font-semibold">Security</h2>
        </div>
        
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-text-secondary">
              Note: You can only change your password once every 30 days.
            </span>
            <Button type="submit" disabled={loadingPass} size="sm">
              {loadingPass ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
