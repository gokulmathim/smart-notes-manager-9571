import React, { useMemo, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import NotesPage from './pages/NotesPage'
import AuthPage from './pages/AuthPage'

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  const [authenticated, setAuthenticated] = useState<boolean>(true) // TODO: wire to real auth
  const navigate = useNavigate()

  const onLogout = () => {
    setAuthenticated(false)
    navigate('/auth')
  }

  const appContent = useMemo(() => (
    <Layout onLogout={onLogout}>
      <Routes>
        <Route path="/" element={authenticated ? <NotesPage /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage onAuthenticated={() => { setAuthenticated(true); navigate('/'); }} />} />
        <Route path="*" element={<Navigate to={authenticated ? '/' : '/auth'} replace />} />
      </Routes>
    </Layout>
  ), [authenticated])

  return appContent
}
