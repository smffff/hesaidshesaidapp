-- Create users table extension (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create relationships table
CREATE TABLE IF NOT EXISTS public.relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_name TEXT NOT NULL,
  relationship_context TEXT,
  communication_patterns TEXT,
  emotional_triggers TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create translations table
CREATE TABLE IF NOT EXISTS public.translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  relationship_id UUID REFERENCES public.relationships(id) ON DELETE SET NULL,
  mode TEXT NOT NULL CHECK (mode IN ('speak', 'understand')),
  original_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  context TEXT,
  emotional_tone TEXT,
  safety_level INTEGER CHECK (safety_level >= 0 AND safety_level <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage_stats table for tracking freemium limits
CREATE TABLE IF NOT EXISTS public.usage_stats (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  translation_count INTEGER NOT NULL DEFAULT 0,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  PRIMARY KEY (user_id, date)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_relationships_user_id ON public.relationships(user_id);
CREATE INDEX IF NOT EXISTS idx_translations_user_id ON public.translations(user_id);
CREATE INDEX IF NOT EXISTS idx_translations_created_at ON public.translations(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_date ON public.usage_stats(user_id, date);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for relationships
CREATE POLICY "Users can view their own relationships"
  ON public.relationships FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own relationships"
  ON public.relationships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own relationships"
  ON public.relationships FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own relationships"
  ON public.relationships FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for translations
CREATE POLICY "Users can view their own translations"
  ON public.translations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own translations"
  ON public.translations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage_stats
CREATE POLICY "Users can view their own usage stats"
  ON public.usage_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage stats"
  ON public.usage_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage stats"
  ON public.usage_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.relationships
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to increment usage count
CREATE OR REPLACE FUNCTION public.increment_usage_count(p_user_id UUID, p_tier TEXT)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  INSERT INTO public.usage_stats (user_id, date, translation_count, subscription_tier)
  VALUES (p_user_id, CURRENT_DATE, 1, p_tier)
  ON CONFLICT (user_id, date)
  DO UPDATE SET translation_count = usage_stats.translation_count + 1;
  
  SELECT translation_count INTO v_count
  FROM public.usage_stats
  WHERE user_id = p_user_id AND date = CURRENT_DATE;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check usage limit
CREATE OR REPLACE FUNCTION public.check_usage_limit(p_user_id UUID, p_tier TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
  v_limit INTEGER;
BEGIN
  -- Set limits based on tier
  IF p_tier = 'premium' THEN
    v_limit := 100;
  ELSE
    v_limit := 5;
  END IF;
  
  -- Get current usage
  SELECT COALESCE(translation_count, 0) INTO v_count
  FROM public.usage_stats
  WHERE user_id = p_user_id AND date = CURRENT_DATE;
  
  RETURN v_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
