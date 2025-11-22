'use client'

import { TranslationResponse } from '@/types'
import { MessageSquare, Heart, AlertCircle } from 'lucide-react'

interface TranslationResultProps {
  result: TranslationResponse
  mode: 'speak' | 'understand'
}

// Note: All user-provided text content is safely rendered by React
// React automatically escapes text in JSX expressions, preventing XSS attacks
export function TranslationResult({ result, mode }: TranslationResultProps) {
  const getSafetyColor = (level: number) => {
    if (level >= 8) return 'text-green-600'
    if (level >= 5) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Original Text */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">
            {mode === 'speak' ? 'What you wanted to say:' : "What they said:"}
          </h3>
        </div>
        <p className="text-gray-800 italic">&ldquo;{result.originalText}&rdquo;</p>
      </div>

      {/* Translated Text */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-pink-500" />
          <h3 className="text-sm font-medium text-gray-700">
            {mode === 'speak' ? 'Nervous-system-safe version:' : 'What they might really mean:'}
          </h3>
        </div>
        <p className="text-gray-900 font-medium">&ldquo;{result.translatedText}&rdquo;</p>
      </div>

      {/* Analysis */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-1 text-blue-500" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-700">Emotional Tone</h4>
            <p className="text-sm text-gray-600">{result.emotionalTone}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className={`w-4 h-4 mt-1 rounded-full ${
            result.safetyLevel >= 8 ? 'bg-green-500' : 
            result.safetyLevel >= 5 ? 'bg-yellow-500' : 
            'bg-red-500'
          }`} />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-700">Safety Level</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    result.safetyLevel >= 8 ? 'bg-green-500' : 
                    result.safetyLevel >= 5 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${result.safetyLevel * 10}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getSafetyColor(result.safetyLevel)}`}>
                {result.safetyLevel}/10
              </span>
            </div>
            {result.explanation && (
              <p className="text-sm text-gray-600 mt-1">{result.explanation}</p>
            )}
          </div>
        </div>

        {result.suggestions && result.suggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h4>
            <ul className="space-y-1">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
