import React, { useState } from 'react'
import ThemeToggle from '../ThemeToggle'
import Header from './Header'
import Sidebar from './Sidebar'
import BackgroundBlur from '../BackgroundBlur'

type LayoutProps = {
  children: React.ReactNode
  onLogout?: () => void
}

/**
 * PUBLIC_INTERFACE
 * Layout - wraps application with header, sidebar, theme toggle and main area.
 */
export default function Layout({ children, onLogout }: LayoutProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined)
  const [forceNewNote, setForceNewNote] = useState(0)

  // Tags can be derived from notes; for initial scaffold provide some defaults
  const tags = ['Work', 'Personal', 'Ideas', 'Todo']

  return (
    <div className="app">
      <BackgroundBlur />
      <ThemeToggle />
      <Header
        onSearch={setSearchTerm}
        onNewNote={() => setForceNewNote(v => v + 1)}
        onLogout={onLogout}
      />
      <Sidebar tags={tags} activeTag={activeTag} onSelectTag={setActiveTag} />
      <main className="main">
        {/* Context provider (simple props via React.Children.map) */}
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          return React.cloneElement(child as any, { searchTerm, activeTag, forceNewNote })
        })}
      </main>
    </div>
  )
}
