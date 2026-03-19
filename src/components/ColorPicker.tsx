import React from 'react'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
  isDark: boolean
}

const PRESET_COLORS = [
  '#000000',
  '#1e3a5f',
  '#4c1d95',
  '#7f1d1d',
  '#064e3b',
  '#06b6d4',
  '#7c3aed',
  '#dc2626',
]

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, isDark }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={`text-xs font-semibold uppercase tracking-widest ${
          isDark ? 'text-zinc-400' : 'text-zinc-500'
        }`}
      >
        {label}
      </label>
      <div className="flex items-center gap-2 flex-wrap">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            aria-label={`Select color ${color}`}
            className="w-7 h-7 rounded-lg transition-all duration-200 flex-shrink-0"
            style={{
              backgroundColor: color,
              border: value === color ? '2px solid #22d3ee' : '2px solid transparent',
              transform: value === color ? 'scale(1.2)' : 'scale(1)',
              boxShadow: value === color ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none',
            }}
          />
        ))}
        <div className="relative flex-shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-7 h-7 rounded-lg cursor-pointer border-2 border-zinc-600 opacity-0 absolute inset-0"
            aria-label={`Custom color for ${label}`}
            id={`color-picker-${label}`}
          />
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs cursor-pointer border-2 border-dashed border-zinc-500 hover:border-cyan-400 transition-colors duration-200"
            style={{ backgroundColor: 'transparent' }}
          >
            <span className="text-zinc-400 font-bold">+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
