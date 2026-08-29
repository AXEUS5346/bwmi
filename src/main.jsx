import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './store/AuthContext'

/* Global error handler — catches unhandled errors so navigation doesn't show blank page */
window.addEventListener('error', (e) => {
  console.error('[MCA Global Error]', e.error || e.message)
})
window.addEventListener('unhandledrejection', (e) => {
  console.error('[MCA Unhandled Promise]', e.reason)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
