export type TranslationMode = 'speak' | 'understand'

export interface User {
  id: string
  email: string
  created_at: string
  subscription_tier: 'free' | 'premium'
}

export interface Relationship {
  id: string
  user_id: string
  partner_name: string
  relationship_context: string
  communication_patterns?: string
  emotional_triggers?: string
  created_at: string
  updated_at: string
}

export interface Translation {
  id: string
  user_id: string
  relationship_id?: string
  mode: TranslationMode
  original_text: string
  translated_text: string
  context?: string
  emotional_tone?: string
  safety_level?: number
  created_at: string
}

export interface UsageStats {
  user_id: string
  date: string
  translation_count: number
  subscription_tier: 'free' | 'premium'
}

export interface TranslationRequest {
  text: string
  mode: TranslationMode
  relationshipContext?: {
    partnerName?: string
    communicationPatterns?: string
    emotionalTriggers?: string
  }
}

export interface TranslationResponse {
  originalText: string
  translatedText: string
  emotionalTone: string
  safetyLevel: number
  explanation?: string
  suggestions?: string[]
}

export interface SubscriptionTier {
  name: 'free' | 'premium'
  dailyLimit: number
  features: string[]
  price?: number
}
