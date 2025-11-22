'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { ModeToggle } from '@/components/translator/ModeToggle'
import { TranslatorForm } from '@/components/translator/TranslatorForm'
import { TranslationResult } from '@/components/translator/TranslationResult'
import { UsageLimit } from '@/components/ui/UsageLimit'
import { RelationshipSelector } from '@/components/relationships/RelationshipSelector'
import { useAppStore } from '@/store/appStore'
import { TranslationResponse, Relationship } from '@/types'

export default function Home() {
  const { mode, setMode, currentRelationship, setCurrentRelationship } = useAppStore()
  const [result, setResult] = useState<TranslationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [relationships] = useState<Relationship[]>([])
  const [usageCount, setUsageCount] = useState(0)
  const [dailyLimit] = useState(5)
  const [tier] = useState<'free' | 'premium'>('free')

  const handleTranslate = async (text: string): Promise<TranslationResponse> => {
    setIsLoading(true)
    try {
      // In production, this would call the Supabase Edge Function
      // For now, we'll simulate a response
      const mockResponse: TranslationResponse = {
        originalText: text,
        translatedText: mode === 'speak' 
          ? `I feel ${text.toLowerCase().includes('you') ? 'hurt' : 'upset'} when this happens, and I need us to find a way to communicate that works for both of us.`
          : `They might be feeling overwhelmed and need space to process. Their words suggest they're trying to protect themselves emotionally.`,
        emotionalTone: mode === 'speak' ? 'vulnerable, expressing needs' : 'seeking connection',
        safetyLevel: 8,
        explanation: 'This message uses nervous-system-safe communication principles.',
        suggestions: [
          'Take a breath before sending',
          'Notice your own emotional state',
          'Focus on connection over being right',
        ],
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      setResult(mockResponse)
      setUsageCount(prev => prev + 1)
      return mockResponse
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">He Said / She Said</h1>
                <p className="text-sm text-gray-600">by Ikwe.ai</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <UsageLimit count={usageCount} limit={dailyLimit} tier={tier} />
            <RelationshipSelector
              relationships={relationships}
              currentRelationship={currentRelationship}
              onSelect={setCurrentRelationship}
            />
          </div>

          {/* Main Translator Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Emotionally Intelligent Communication
                </h2>
                <p className="text-gray-600">
                  {mode === 'speak'
                    ? 'Transform your message into nervous-system-safe communication that promotes connection.'
                    : 'Understand what your partner is really trying to express beneath their words.'}
                </p>
              </div>

              <div className="mb-6">
                <ModeToggle mode={mode} onChange={setMode} />
              </div>

              <TranslatorForm
                mode={mode}
                onTranslate={handleTranslate}
                isLoading={isLoading}
              />
            </div>

            {result && (
              <TranslationResult result={result} mode={mode} />
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Speak Mode</h3>
              <p className="text-gray-600">
                Translate conflict into clarity. Express your feelings using &ldquo;I&rdquo; statements,
                take ownership of emotions, and communicate needs clearly without blame.
                Perfect for when you&apos;re feeling reactive or defensive.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Understand Mode</h3>
              <p className="text-gray-600">
                Decode your partner&apos;s message. Discover the underlying emotions and needs
                they&apos;re expressing, understand their nervous system state, and learn what
                might help them feel heard and understood.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>He Said / She Said — An emotionally intelligent AI communication engine by Ikwe.ai</p>
        </div>
      </footer>
    </div>
  )
}
