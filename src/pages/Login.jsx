import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from 'react-hot-toast'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()
  const { signIn, signUp } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isLogin) {
        await signIn({ email, password })
        toast.success('Welcome back!')
        navigate('/')
      } else {
        const { user } = await signUp({ email, password })
        // Check if email confirmation is required (default in Supabase)
        if (user && user.identities && user.identities.length === 0) {
             toast.error('This email is already in use.')
        } else {
            toast.success('Account created! Check email for verification if enabled.')
            // If email confirm is off, they might be logged in. Supabase behavior varies by config.
            // Usually signUp doesn't auto-login if email confirm is on.
            // We'll assume they might need to login or are logged in.
             navigate('/')
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-bg-secondary rounded-2xl shadow-xl p-8 border border-bg-elevated animate-in fade-in zoom-in-95 duration-300">
        <h1 className="text-3xl font-bold text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-text-secondary text-center mb-8">
          {isLogin ? 'Sign in to continue to MeetingStack' : 'Get started with your free account'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />

          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm text-text-muted hover:text-accent-primary transition-colors">
              Forgot password?
            </a>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 flex gap-6 text-xs text-text-muted">
        <Link to="/privacy" className="hover:text-accent-primary transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-accent-primary transition-colors">Terms of Service</Link>
      </div>
    </div>
  )
}
