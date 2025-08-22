import React, { useState } from 'react'

type AuthPageProps = {
  onAuthenticated: () => void
}

/**
 * PUBLIC_INTERFACE
 * AuthPage - Simple authentication scaffold (email/password).
 * Replace with real backend integration.
 */
export default function AuthPage({ onAuthenticated }: AuthPageProps): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with backend API, then:
    onAuthenticated()
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
      <form onSubmit={submit} className="card" style={{ minWidth: 320, padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
          />
          <button className="button primary" type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
          <button className="button" type="button" onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  )
}
