import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TranslationRequest {
  text: string
  mode: 'speak' | 'understand'
  relationshipContext?: {
    partnerName?: string
    communicationPatterns?: string
    emotionalTriggers?: string
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get user's subscription tier
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single()

    const tier = profile?.subscription_tier || 'free'

    // Check usage limit
    const { data: canUse } = await supabaseClient.rpc('check_usage_limit', {
      p_user_id: user.id,
      p_tier: tier,
    })

    if (!canUse) {
      return new Response(
        JSON.stringify({
          error: 'Daily limit reached. Please upgrade to premium for more translations.',
          limitReached: true,
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Parse request body
    const { text, mode, relationshipContext }: TranslationRequest = await req.json()

    if (!text || !mode) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Call OpenAI API for translation
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error(
        'OPENAI_API_KEY environment variable is missing. Please configure it in Supabase secrets using: supabase secrets set OPENAI_API_KEY=your_key'
      )
    }

    const systemPrompt = mode === 'speak'
      ? buildSpeakModePrompt(relationshipContext)
      : buildUnderstandModePrompt(relationshipContext)

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`)
    }

    const openaiData = await openaiResponse.json()
    const translatedText = openaiData.choices[0]?.message?.content || ''

    // Analyze emotional tone and safety level
    const analysis = analyzeTranslation(text, translatedText)

    // Increment usage count
    await supabaseClient.rpc('increment_usage_count', {
      p_user_id: user.id,
      p_tier: tier,
    })

    // Store translation in database
    await supabaseClient.from('translations').insert({
      user_id: user.id,
      mode,
      original_text: text,
      translated_text: translatedText,
      emotional_tone: analysis.emotionalTone,
      safety_level: analysis.safetyLevel,
      context: relationshipContext ? JSON.stringify(relationshipContext) : null,
    })

    return new Response(
      JSON.stringify({
        originalText: text,
        translatedText,
        emotionalTone: analysis.emotionalTone,
        safetyLevel: analysis.safetyLevel,
        explanation: analysis.explanation,
        suggestions: analysis.suggestions,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

function buildSpeakModePrompt(context?: { partnerName?: string; communicationPatterns?: string; emotionalTriggers?: string }): string {
  const basePrompt = `You are an emotionally intelligent communication expert specializing in nervous-system-safe communication. 

Your role is to translate potentially reactive, defensive, or conflict-driven messages into clear, compassionate, and emotionally safe communication that:
1. Expresses feelings using "I" statements
2. Takes ownership of emotions without blaming
3. Communicates needs clearly and respectfully
4. Removes defensive or attacking language
5. Maintains authenticity while promoting connection
6. Uses non-violent communication principles
7. Considers the nervous system state of both parties

Transform the following message into a nervous-system-safe version that promotes understanding and connection while preserving the core message and authentic feelings.`

  if (context?.partnerName) {
    return `${basePrompt}\n\nRelationship context: This message is for ${context.partnerName}.${
      context.communicationPatterns
        ? `\nCommunication patterns: ${context.communicationPatterns}`
        : ''
    }${
      context.emotionalTriggers
        ? `\nEmotional triggers to be mindful of: ${context.emotionalTriggers}`
        : ''
    }`
  }

  return basePrompt
}

function buildUnderstandModePrompt(context?: { partnerName?: string; communicationPatterns?: string; emotionalTriggers?: string }): string {
  const basePrompt = `You are an emotionally intelligent communication expert helping someone understand their partner's message.

Your role is to:
1. Identify the underlying emotions and needs being expressed
2. Explain what the person might really be trying to communicate
3. Highlight any defensive or reactive language patterns
4. Suggest the emotional state the person might be in
5. Provide insight into what might help them feel heard and understood
6. Point out any attachment or nervous system activation patterns

Analyze the following message and help the recipient understand what their partner might really be trying to express beneath the words.`

  if (context?.partnerName) {
    return `${basePrompt}\n\nRelationship context: This message is from ${context.partnerName}.${
      context.communicationPatterns
        ? `\nKnown communication patterns: ${context.communicationPatterns}`
        : ''
    }${
      context.emotionalTriggers
        ? `\nKnown emotional triggers: ${context.emotionalTriggers}`
        : ''
    }`
  }

  return basePrompt
}

function analyzeTranslation(original: string, translated: string): {
  emotionalTone: string
  safetyLevel: number
  explanation: string
  suggestions: string[]
} {
  // Simple heuristic analysis (in production, this could use additional AI analysis)
  const safetyIndicators = {
    hasIStatements: /\bI feel\b|\bI need\b|\bI want\b/i.test(translated),
    noBlaming: !/\byou always\b|\byou never\b/i.test(translated),
    noAttacking: !/\bstupid\b|\bidiot\b|\bwrong\b/i.test(translated.toLowerCase()),
    hasCuriosityOrInquiry: /\?/.test(translated),
  }

  const safetyScore = Object.values(safetyIndicators).filter(Boolean).length
  const safetyLevel = Math.round((safetyScore / 4) * 10)

  const emotionalTones = []
  if (/\bfeel\b|\bemotion/i.test(translated)) emotionalTones.push('vulnerable')
  if (/\bneed\b|\bwant\b/i.test(translated)) emotionalTones.push('expressing needs')
  if (/\bunderstand\b|\blisten\b/i.test(translated)) emotionalTones.push('seeking connection')

  return {
    emotionalTone: emotionalTones.join(', ') || 'neutral',
    safetyLevel,
    explanation: safetyLevel >= 7
      ? 'This message uses nervous-system-safe communication principles.'
      : 'This message could be softened further for better reception.',
    suggestions: [
      'Take a breath before sending',
      'Notice your own emotional state',
      'Focus on connection over being right',
    ],
  }
}
