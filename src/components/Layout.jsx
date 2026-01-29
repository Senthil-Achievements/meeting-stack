import { Outlet, useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut, Settings } from 'lucide-react'

export default function Layout() {
  const { signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans">
      <header className="border-b border-bg-elevated sticky top-0 bg-bg-primary/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📝</span>
            <span className="text-xl font-bold bg-gradient-to-r from-accent-primary to-accent-hover bg-clip-text text-transparent">
              MeetingStack
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link 
              to="/settings"
              className="p-2 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors"
              title="Settings"
            >
              <Settings size={20} />
            </Link>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      <footer className="border-t border-bg-elevated mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-text-secondary text-sm mb-2">
            © {new Date().getFullYear()} MeetingStack. Created by <span className="font-semibold text-accent-primary">PS Technologies</span>.
          </p>
          <div className="flex justify-center gap-4 text-xs text-text-muted">
            <Link to="/privacy" className="hover:text-accent-primary transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-accent-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
