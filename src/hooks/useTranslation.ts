import { useState } from 'react'
import { TranslationMode, TranslationResponse } from '@/types'
import { useAppStore } from '@/store/appStore'

export function useTranslation() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { currentRelationship, addTranslation } = useAppStore()

  const translate = async (
    text: string,
    mode: TranslationMode
  ): Promise<TranslationResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      // Build relationship context if available
      const relationshipContext = currentRelationship
        ? {
            partnerName: currentRelationship.partner_name,
            communicationPatterns: currentRelationship.communication_patterns,
            emotionalTriggers: currentRelationship.emotional_triggers,
          }
        : undefined

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          mode,
          relationshipContext,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Translation failed')
      }

      const data: TranslationResponse = await response.json()

      // Add to store (in production, this would come from the API response)
      addTranslation({
        id: crypto.randomUUID(),
        user_id: 'current-user', // Would come from auth
        relationship_id: currentRelationship?.id,
        mode,
        original_text: text,
        translated_text: data.translatedText,
        emotional_tone: data.emotionalTone,
        safety_level: data.safetyLevel,
        created_at: new Date().toISOString(),
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    translate,
    isLoading,
    error,
  }
}
