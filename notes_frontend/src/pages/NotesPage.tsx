import React, { useEffect, useMemo, useState } from 'react'

type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  updatedAt: number
}

type NotesPageProps = {
  searchTerm?: string
  activeTag?: string
  forceNewNote?: number
}

/**
 * PUBLIC_INTERFACE
 * NotesPage - Main notes CRUD UI (client-side placeholder). Integrate with backend later via HTTP REST.
 */
export default function NotesPage({ searchTerm = '', activeTag, forceNewNote }: NotesPageProps): JSX.Element {
  const [notes, setNotes] = useState<Note[]>(() => {
    const seed: Note[] = [
      { id: crypto.randomUUID(), title: 'Welcome note', content: 'Start writing your notes...', tags: ['Ideas'], updatedAt: Date.now() - 100000 },
      { id: crypto.randomUUID(), title: 'Shopping list', content: 'Milk, Bread, Eggs', tags: ['Personal', 'Todo'], updatedAt: Date.now() - 50000 },
      { id: crypto.randomUUID(), title: 'Meeting notes', content: 'Discuss Q3 roadmap.', tags: ['Work'], updatedAt: Date.now() - 15000 }
    ]
    return seed
  })
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (forceNewNote) {
      const n: Note = { id: crypto.randomUUID(), title: 'Untitled', content: '', tags: [], updatedAt: Date.now() }
      setNotes(prev => [n, ...prev])
      setSelectedId(n.id)
    }
  }, [forceNewNote])

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    return notes
      .filter(n => !activeTag || n.tags.includes(activeTag))
      .filter(n => !term || n.title.toLowerCase().includes(term) || n.content.toLowerCase().includes(term))
      .sort((a, b) => b.updatedAt - a.updatedAt)
  }, [notes, searchTerm, activeTag])

  const selected = useMemo(() => filtered.find(n => n.id === selectedId) ?? filtered[0], [filtered, selectedId])

  const updateNote = (id: string, patch: Partial<Note>) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    if (selectedId === id) setSelectedId(undefined)
  }

  const addTagToSelected = (tag: string) => {
    if (!selected) return
    if (selected.tags.includes(tag)) return
    updateNote(selected.id, { tags: [...selected.tags, tag] })
  }

  const removeTagFromSelected = (tag: string) => {
    if (!selected) return
    updateNote(selected.id, { tags: selected.tags.filter(t => t !== tag) })
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 16 }}>
      {/* Notes List */}
      <section className="card" aria-label="Notes list">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <strong>Notes</strong>
          <span style={{ color: 'var(--text-secondary)' }}>{filtered.length}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
          {filtered.map(n => (
            <button
              key={n.id}
              className="button"
              style={{ justifyContent: 'space-between', textAlign: 'left' }}
              onClick={() => setSelectedId(n.id)}
            >
              <span>
                <div style={{ fontWeight: 600 }}>{n.title || 'Untitled'}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(n.updatedAt).toLocaleString()}</div>
              </span>
              <span className="chips">
                {n.tags.slice(0, 3).map(t => <span key={t} className="chip">{t}</span>)}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ color: 'var(--text-secondary)' }}>No notes found.</div>
          )}
        </div>
      </section>

      {/* Note Detail */}
      <section className="card" aria-label="Note details">
        {!selected ? (
          <div style={{ color: 'var(--text-secondary)' }}>Select a note to view and edit.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              value={selected.title}
              onChange={(e) => updateNote(selected.id, { title: e.target.value })}
              placeholder="Title"
              style={{
                fontSize: 20,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-color)'
              }}
            />
            <textarea
              value={selected.content}
              onChange={(e) => updateNote(selected.id, { content: e.target.value })}
              placeholder="Start writing..."
              rows={16}
              style={{
                padding: 12,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-color)',
                resize: 'vertical',
                minHeight: 200
              }}
            />
            <div>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Tags</div>
              <div className="chips" style={{ marginBottom: 8 }}>
                {selected.tags.map(t => (
                  <span key={t} className="chip" onClick={() => removeTagFromSelected(t)} title="Remove tag">
                    {t} ✕
                  </span>
                ))}
              </div>
              <div className="chips">
                {['Work', 'Personal', 'Ideas', 'Todo'].map(t => (
                  <button key={t} className="chip" onClick={() => addTagToSelected(t)}>{t} +</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="button" onClick={() => updateNote(selected.id, { })}>Save</button>
              <button className="button" style={{ color: '#d33' }} onClick={() => deleteNote(selected.id)}>Delete</button>
            </div>
          </div>
        )}
      </section>
      <style>{`
        @media (max-width: 900px) {
          div[aria-label="Notes list"] + section {
            grid-column: span 1 / auto;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
