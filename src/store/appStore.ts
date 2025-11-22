import { create } from 'zustand'
import { TranslationMode, Relationship, Translation } from '@/types'

interface AppState {
  mode: TranslationMode
  currentRelationship: Relationship | null
  translations: Translation[]
  usageCount: number
  dailyLimit: number
  subscriptionTier: 'free' | 'premium'
  
  setMode: (mode: TranslationMode) => void
  setCurrentRelationship: (relationship: Relationship | null) => void
  addTranslation: (translation: Translation) => void
  setUsageStats: (count: number, limit: number, tier: 'free' | 'premium') => void
}

export const useAppStore = create<AppState>((set) => ({
  mode: 'speak',
  currentRelationship: null,
  translations: [],
  usageCount: 0,
  dailyLimit: 5,
  subscriptionTier: 'free',
  
  setMode: (mode) => set({ mode }),
  setCurrentRelationship: (relationship) => set({ currentRelationship: relationship }),
  addTranslation: (translation) => 
    set((state) => ({ translations: [translation, ...state.translations] })),
  setUsageStats: (count, limit, tier) => 
    set({ usageCount: count, dailyLimit: limit, subscriptionTier: tier }),
}))
