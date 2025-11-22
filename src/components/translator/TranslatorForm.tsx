'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { TranslationMode, TranslationResponse } from '@/types'

interface TranslatorFormProps {
  mode: TranslationMode
  onTranslate: (text: string) => Promise<TranslationResponse>
  isLoading: boolean
}

export function TranslatorForm({ mode, onTranslate, isLoading }: TranslatorFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || isLoading) return
    
    await onTranslate(text)
    setText('')
  }

  const placeholder = mode === 'speak'
    ? "Type what you want to say... We'll help you express it safely."
    : "Paste your partner's message... We'll help you understand what they really mean."

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-32 p-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  )
}
