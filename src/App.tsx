import { useState, useEffect } from 'react'
import QRGenerator from './components/QRGenerator'

function App() {
  const [isDark, setIsDark] = useState(true)

  // Apply dark/light class to html element
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark
          ? 'bg-black text-white'
          : 'bg-gradient-to-br from-zinc-50 via-white to-cyan-50/30 text-zinc-900'
        }`}
    >
      {/* Ambient background glow */}
      {isDark && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 15% 40%, rgba(6, 182, 212, 0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(6, 182, 212, 0.04) 0%, transparent 55%)',
          }}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <QRGenerator isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 py-6 text-center transition-colors duration-300 ${isDark ? 'border-t border-zinc-900' : 'border-t border-zinc-100'
          }`}
      >

        <p
          className={`text-xs ${isDark ? 'text-zinc-700' : 'text-zinc-300'}`}
        >
          Made with ❤️ by ABVI
        </p>
      </footer>
    </div>
  )
}

export default App
