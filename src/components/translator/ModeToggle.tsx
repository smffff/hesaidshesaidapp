'use client'

import { TranslationMode } from '@/types'
import { MessageCircle, Ear } from 'lucide-react'

interface ModeToggleProps {
  mode: TranslationMode
  onChange: (mode: TranslationMode) => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => onChange('speak')}
        className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
          mode === 'speak'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <MessageCircle className="w-5 h-5" />
        <span>Speak</span>
      </button>
      <button
        onClick={() => onChange('understand')}
        className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
          mode === 'understand'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Ear className="w-5 h-5" />
        <span>Understand</span>
      </button>
    </div>
  )
}
