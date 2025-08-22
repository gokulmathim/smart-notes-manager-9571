import React from 'react'

type SidebarProps = {
  tags: string[]
  activeTag?: string
  onSelectTag: (tag?: string) => void
}

/**
 * PUBLIC_INTERFACE
 * Sidebar - navigation and tags filter panel.
 */
export default function Sidebar({ tags, activeTag, onSelectTag }: SidebarProps): JSX.Element {
  return (
    <aside className="sidebar">
      <nav style={{ marginBottom: 16 }}>
        <div className="chips">
          <button className={`chip ${!activeTag ? 'active' : ''}`} onClick={() => onSelectTag(undefined)}>All</button>
          {tags.map((t) => (
            <button key={t} className={`chip ${activeTag === t ? 'active' : ''}`} onClick={() => onSelectTag(t)}>{t}</button>
          ))}
        </div>
      </nav>
      <div className="card" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
        Tip: Use the search box to quickly find notes by title or content.
      </div>
    </aside>
  )
}
