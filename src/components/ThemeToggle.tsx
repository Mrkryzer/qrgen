import React from 'react'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #06b6d4, #0891b2)'
          : 'rgba(200,200,200,0.5)',
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all duration-300"
        style={{
          background: 'white',
          transform: isDark ? 'translateX(24px)' : 'translateX(0)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}

export default ThemeToggle
