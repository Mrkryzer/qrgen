import React, { useState } from 'react'
import QRDisplay from './QRDisplay'
import ColorPicker from './ColorPicker'
import ThemeToggle from './ThemeToggle'
import ErrorBoundary from './ErrorBoundary'

interface QRGeneratorProps {
  isDark: boolean
  onToggleTheme: () => void
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ isDark, onToggleTheme }) => {
  const [inputValue, setInputValue] = useState('')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [showCustomize, setShowCustomize] = useState(false)
  const [touched, setTouched] = useState(false)

  const isEmpty = touched && inputValue.trim() === ''

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!touched) setTouched(true)
    setInputValue(e.target.value)
  }

  const handleClear = () => {
    setInputValue('')
    setTouched(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm13-2h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z" />
              </svg>
            </div>
            <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              QR<span className="text-gradient">Gen</span>
            </h1>
          </div>
          <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Generate powerful QR codes instantly
          </p>
        </div>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>

      {/* Card */}
      <div
        className={`rounded-3xl p-6 shadow-2xl transition-all duration-300 ${
          isDark ? 'glass glow-cyan' : 'glass-light shadow-zinc-200/60'
        }`}
      >
        {/* Input Section */}
        <div className="mb-5">
          <label
            htmlFor="qr-input"
            className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${
              isDark ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            Text or URL
          </label>
          <div className="relative">
            <input
              id="qr-input"
              type="text"
              value={inputValue}
              onChange={handleInput}
              onBlur={() => setTouched(true)}
              placeholder="https://example.com or any text..."
              className={`input-field pr-10 ${isDark ? '' : 'input-light'} ${
                isEmpty ? 'border-red-500/60 focus:border-red-400' : ''
              }`}
              aria-describedby={isEmpty ? 'input-error' : undefined}
            />
            {inputValue && (
              <button
                onClick={handleClear}
                aria-label="Clear input"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Validation message */}
          {isEmpty && (
            <p
              id="input-error"
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fade-in"
              role="alert"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter some text or a URL to generate a QR code
            </p>
          )}
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center mb-5">
          <ErrorBoundary>
            <QRDisplay
              value={inputValue}
              fgColor={fgColor}
              bgColor={bgColor}
              isDark={isDark}
            />
          </ErrorBoundary>
        </div>

        {/* Customise Toggle */}
        <div className="mt-2">
          <button
            onClick={() => setShowCustomize((v) => !v)}
            id="customize-btn"
            className={`w-full flex items-center justify-between text-xs font-semibold uppercase tracking-widest py-2 px-3 rounded-xl transition-all duration-200 ${
              isDark
                ? 'text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800/50'
                : 'text-zinc-500 hover:text-cyan-600 hover:bg-zinc-100'
            }`}
          >
            <span>Customize Colors</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showCustomize ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Color Customizer Panel */}
          {showCustomize && (
            <div
              className={`mt-3 p-4 rounded-2xl space-y-4 animate-slide-up ${
                isDark ? 'bg-zinc-900/60 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
              }`}
            >
              <ColorPicker
                label="QR Color"
                value={fgColor}
                onChange={setFgColor}
                isDark={isDark}
              />
              <ColorPicker
                label="Background"
                value={bgColor}
                onChange={setBgColor}
                isDark={isDark}
              />
              <button
                onClick={() => { setFgColor('#000000'); setBgColor('#ffffff') }}
                className={`text-xs font-medium transition-colors duration-200 ${
                  isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Reset to defaults
              </button>
            </div>
          )}
        </div>

        {/* Character count */}
        {inputValue && (
          <p className={`mt-3 text-right text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
            {inputValue.length} character{inputValue.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}

export default QRGenerator
