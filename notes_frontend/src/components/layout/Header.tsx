import React from 'react'

type HeaderProps = {
  onSearch: (term: string) => void
  onNewNote: () => void
  onLogout?: () => void
}

/**
 * PUBLIC_INTERFACE
 * Header - top bar with search, new note button, and profile/logout.
 */
export default function Header({ onSearch, onNewNote, onLogout }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <strong style={{ color: 'var(--primary)' }}>Smart Notes</strong>
      <div className="search">
        <input
          placeholder="Search notes..."
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <button className="button primary" onClick={onNewNote}>+ New Note</button>
      <button className="button" onClick={onLogout}>Logout</button>
    </header>
  )
}
