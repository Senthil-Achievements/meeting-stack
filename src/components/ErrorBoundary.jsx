import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0E1A] text-white flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h1>
          <pre className="bg-gray-800 p-4 rounded text-left overflow-auto max-w-2xl text-sm font-mono mb-6">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FFB84D] text-[#0A0E1A] px-6 py-2 rounded-lg font-bold hover:opacity-90"
          >
            Reload Application
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
