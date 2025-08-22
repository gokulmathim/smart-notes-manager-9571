import React, { useEffect, useCallback } from 'react'

/**
 * PUBLIC_INTERFACE
 * ThemeToggle - toggles light/dark theme by adding 'dark-theme' to body and persisting in localStorage.
 */
export default function ThemeToggle(): JSX.Element {
  const applySavedTheme = useCallback(() => {
    const saved = localStorage.getItem('theme') || 'light'
    const body = document.body
    if (saved === 'dark') body.classList.add('dark-theme')
    else body.classList.remove('dark-theme')
  }, [])

  const toggleTheme = useCallback(() => {
    const body = document.body
    const isDark = body.classList.contains('dark-theme')
    if (isDark) {
      body.classList.remove('dark-theme')
      localStorage.setItem('theme', 'light')
    } else {
      body.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark')
    }
  }, [])

  useEffect(() => {
    applySavedTheme()
  }, [applySavedTheme])

  return (
    <>
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="theme-toggle"
        id="theme-toggle"
      >
        <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
        </svg>
      </button>
      <style>{`
        .theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .theme-toggle:hover { background: rgba(255,255,255,1); transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .theme-toggle .sun-icon { display: block; color: #f59e0b; }
        .theme-toggle .moon-icon { display: none; color: #6366f1; }
        body.dark-theme .theme-toggle { background: rgba(31,41,55,0.9); border-color: rgba(255,255,255,0.2); }
        body.dark-theme .theme-toggle:hover { background: rgba(31,41,55,1); }
        body.dark-theme .theme-toggle .sun-icon { display: none; }
        body.dark-theme .theme-toggle .moon-icon { display: block; }
        @media (max-width: 768px) {
          .theme-toggle { top: 16px; right: 16px; width: 44px; height: 44px; }
        }
      `}</style>
    </>
  )
}
