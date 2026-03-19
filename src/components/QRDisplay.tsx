import React, { useRef, useCallback } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

interface QRDisplayProps {
  value: string
  fgColor: string
  bgColor: string
  isDark: boolean
}

const QRDisplay: React.FC<QRDisplayProps> = ({ value, fgColor, bgColor, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(() => {
    if (!containerRef.current) return

    const canvas = containerRef.current.querySelector('canvas')
    if (!canvas) return

    // qrcode.react renders a standard <canvas>, so we can just grab its data URL
    const pngUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = pngUrl
    a.download = 'qrgen-code.png'
    a.click()
  }, [])

  if (!value.trim()) {
    return (
      <div
        className={`flex flex-col items-center justify-center w-full aspect-square max-w-[240px] mx-auto rounded-2xl border-2 border-dashed transition-all duration-300 animate-fade-in ${
          isDark
            ? 'border-zinc-700 text-zinc-600'
            : 'border-zinc-300 text-zinc-400'
        }`}
      >
        <svg
          className="w-12 h-12 mb-3 opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
          />
        </svg>
        <p className="text-xs font-medium text-center px-4 leading-relaxed opacity-60">
          Enter text or URL<br />to generate your QR code
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5 animate-slide-up">
      {/* QR Code display */}
      <div
        ref={containerRef}
        className="qr-container shadow-2xl transition-all duration-300 hover:scale-[1.02]"
        style={{ backgroundColor: bgColor }}
      >
        <QRCodeCanvas
          value={value}
          size={200}
          fgColor={fgColor}
          bgColor={bgColor}
          level="H"
          marginSize={2}
          style={{ height: 'auto', maxWidth: '100%', width: '100%', display: 'block' }}
        />
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        id="download-qr-btn"
        className="btn-primary text-white flex items-center gap-2 w-full justify-center"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download PNG
      </button>
    </div>
  )
}

export default QRDisplay
