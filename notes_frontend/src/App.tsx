import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import Welcome from './components/Welcome';

/**
 * PUBLIC_INTERFACE
 * App
 * Root component containing layout (sidebar, header) and route registration.
 * This provides structure for notes, search, tagging, and authentication pages.
 */
export default function App(): JSX.Element {
  return (
    <div className="app-container">
      <ThemeToggle />
      <aside className="sidebar">
        <div className="brand">
          <span className="dot" />
          <span>Smart Notes</span>
        </div>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/notes" className="nav-link">Notes</Link>
          <Link to="/tags" className="nav-link">Tags</Link>
          <Link to="/auth" className="nav-link">Sign In</Link>
        </nav>
      </aside>
      <section className="main">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </section>

      <style>{`
        .app-container { display: grid; grid-template-columns: 260px 1fr; height: 100%; }
        .sidebar {
          border-right: 1px solid var(--border-color);
          background: var(--card-bg);
          padding: 16px;
        }
        .brand { display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 18px; }
        .brand .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--primary); display: inline-block; }
        nav { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
        .nav-link {
          text-decoration: none; padding: 10px 12px; border-radius: 10px;
          color: var(--text-color);
        }
        .nav-link:hover { background: var(--card-hover-bg); }
        .main { display: flex; flex-direction: column; height: 100%; }
        .content { padding: 16px; overflow: auto; height: calc(100% - 64px); }
        @media (max-width: 900px) {
          .app-container { grid-template-columns: 1fr; }
          .sidebar { display: none; }
          .content { height: calc(100% - 56px); }
        }
      `}</style>
    </div>
  );
}

function Header(): JSX.Element {
  const navigate = useNavigate();
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = String(data.get('q') || '');
    if (q) navigate(`/notes?q=${encodeURIComponent(q)}`);
  };
  return (
    <header className="header">
      <form onSubmit={onSearch} className="search">
        <input name="q" placeholder="Search notes..." aria-label="Search notes" />
      </form>
      <div className="user">
        <span className="avatar" />
        <span className="name">Guest</span>
      </div>
      <style>{`
        .header {
          height: 64px; display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px; border-bottom: 1px solid var(--border-color); background: var(--bg-color);
          position: sticky; top: 0; z-index: 5;
        }
        .search { flex: 1; }
        .search input {
          width: 100%; max-width: 520px; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border-color);
          background: var(--card-bg); color: var(--text-color);
        }
        .user { display: flex; align-items: center; gap: 8px; }
        .avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--secondary); }
        .name { color: var(--text-secondary); font-size: 14px; }
      `}</style>
    </header>
  );
}

function NotesPage(): JSX.Element {
  // Placeholder for notes list and detail pane; integrates with backend in future steps.
  const notes = [
    { id: 1, title: 'Welcome Note', tags: ['getting-started'], excerpt: 'This is your first note.' },
    { id: 2, title: 'Design Ideas', tags: ['design', 'ui'], excerpt: 'Color palette and components.' }
  ];
  return (
    <div className="notes-grid">
      {notes.map(n => (
        <article key={n.id} className="note-card">
          <h3>{n.title}</h3>
          <p>{n.excerpt}</p>
          <div className="tags">
            {n.tags.map(t => (<span key={t} className="tag">#{t}</span>))}
          </div>
        </article>
      ))}
      <style>{`
        .notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .note-card {
          background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px;
          padding: 16px; box-shadow: 0 4px 6px var(--shadow-color);
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }
        .note-card:hover { transform: translateY(-2px); box-shadow: 0 6px 10px var(--shadow-hover-color); }
        .tags { margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; }
        .tag { font-size: 12px; color: var(--primary); background: rgba(25,118,210,0.1); padding: 2px 8px; border-radius: 999px; }
      `}</style>
    </div>
  );
}

function TagsPage(): JSX.Element {
  const tags = ['getting-started', 'design', 'ui', 'work', 'personal'];
  return (
    <div className="tags-page">
      <h2>Tags</h2>
      <div className="tag-list">
        {tags.map(tag => <span className="tag-pill" key={tag}>#{tag}</span>)}
      </div>
      <style>{`
        .tags-page h2 { margin-top: 0; }
        .tag-list { display: flex; gap: 10px; flex-wrap: wrap; }
        .tag-pill {
          padding: 8px 12px; background: var(--card-bg); border: 1px solid var(--border-color);
          border-radius: 20px; color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}

function AuthPage(): JSX.Element {
  return (
    <div className="auth">
      <h2>Sign in</h2>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <div className="actions">
          <button className="btn-primary" type="submit">Sign In</button>
          <button className="btn-secondary" type="button">Create Account</button>
        </div>
      </form>
      <style>{`
        .auth-form {
          display: grid; gap: 12px; max-width: 360px;
          background: var(--card-bg); padding: 16px; border: 1px solid var(--border-color); border-radius: 12px;
        }
        .auth-form input {
          padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border-color);
          background: transparent; color: var(--text-color);
        }
        .actions { display: flex; gap: 10px; }
        .btn-primary {
          background: var(--primary); color: white; border: none; padding: 10px 12px; border-radius: 10px; cursor: pointer;
        }
        .btn-secondary {
          background: var(--accent); color: #2c2c2c; border: none; padding: 10px 12px; border-radius: 10px; cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function NotFound(): JSX.Element {
  return <p style={{ color: 'var(--text-secondary)' }}>Page not found.</p>;
}
