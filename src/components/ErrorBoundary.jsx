import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[MCA ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-nzLightBg min-h-[60vh] flex items-center justify-center px-4">
          <div className="bg-white border border-nzDivider max-w-lg w-full p-8 text-center">
            <div className="w-16 h-16 bg-nzRed/10 text-nzRed rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-nzDarkTeal mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-nzBody mb-1">
              An unexpected error occurred while loading this page.
            </p>
            {this.state.error && (
              <p className="text-xs text-nzMuted font-mono bg-nzLightBg border border-nzDivider p-2 mb-4 text-left break-all">
                {this.state.error.message || String(this.state.error)}
              </p>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="bg-nzPrimary text-white px-6 py-2.5 text-sm font-semibold hover:bg-nzMediumTeal transition-colors"
              >
                Try again
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="border border-nzDarkTeal text-nzDarkTeal px-6 py-2.5 text-sm font-semibold hover:bg-nzDarkTeal hover:text-white transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
