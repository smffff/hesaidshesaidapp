'use client'

import { Crown, TrendingUp } from 'lucide-react'

interface UsageLimitProps {
  count: number
  limit: number
  tier: 'free' | 'premium'
}

export function UsageLimit({ count, limit, tier }: UsageLimitProps) {
  const percentage = (count / limit) * 100
  const remaining = limit - count

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {tier === 'premium' ? (
            <Crown className="w-5 h-5 text-yellow-500" />
          ) : (
            <TrendingUp className="w-5 h-5 text-purple-500" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {tier === 'premium' ? 'Premium Plan' : 'Free Plan'}
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {remaining} left today
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            percentage >= 90 ? 'bg-red-500' :
            percentage >= 70 ? 'bg-yellow-500' :
            'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {tier === 'free' && remaining <= 1 && (
        <div className="mt-3 text-sm text-gray-600">
          <p className="mb-2">Running low on translations?</p>
          <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
            <Crown className="w-4 h-4" />
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  )
}
