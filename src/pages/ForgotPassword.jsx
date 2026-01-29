import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { resetPassword } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await resetPassword(email)
      setSubmitted(true)
      toast.success('Reset link sent to your email')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-bg-secondary rounded-2xl shadow-xl p-8 border border-bg-elevated">
        <Link to="/login" className="inline-flex items-center text-text-secondary hover:text-text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>
        
        {!submitted ? (
          <>
            <p className="text-text-secondary text-center mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-bg-elevated w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✉️
            </div>
            <h3 className="text-xl font-semibold mb-2">Check your email</h3>
            <p className="text-text-secondary mb-6">
              We've sent a password reset link to <strong>{email}</strong>.
            </p>
            <Button variant="secondary" onClick={() => setSubmitted(false)} className="w-full">
              Try another email
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
