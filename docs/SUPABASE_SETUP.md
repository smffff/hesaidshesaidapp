# Supabase Configuration Guide

This guide will help you set up Supabase for the He Said / She Said application.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `hesaidshesaid`
   - Database Password: (generate a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

## Step 2: Get Your API Keys

1. Go to Project Settings → API
2. Copy the following values to your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon/public key

## Step 3: Run Database Migrations

### Option A: Using Supabase CLI (Recommended)

```bash
# Install the Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push the migration
supabase db push
```

### Option B: Using SQL Editor

1. Go to SQL Editor in your Supabase dashboard
2. Click "New query"
3. Copy the contents of `supabase/migrations/20240101000000_initial_schema.sql`
4. Paste and click "Run"

## Step 4: Enable Authentication

1. Go to Authentication → Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Add your site URL to allowed redirect URLs

## Step 5: Deploy Edge Function

```bash
# Deploy the AI translation function
supabase functions deploy ai-translate

# Set the OpenAI API key
supabase secrets set OPENAI_API_KEY=your_openai_key_here
```

## Step 6: Test Your Setup

1. Run your Next.js app: `npm run dev`
2. Try signing up a new user
3. Check if the `profiles` table was created automatically
4. Test a translation to verify the edge function works

## Row-Level Security (RLS)

The migration automatically sets up RLS policies that:
- Allow users to view only their own data
- Prevent users from accessing other users' data
- Enable users to create, update, and delete their own records

## Troubleshooting

### "relation does not exist" errors
- Make sure you ran the migration
- Check the SQL Editor for any errors
- Verify you're connected to the correct project

### Authentication issues
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check that email authentication is enabled
- Ensure your site URL is in the allowed redirect URLs

### Edge function not working
- Verify the function is deployed: `supabase functions list`
- Check function logs: `supabase functions logs ai-translate`
- Ensure the OPENAI_API_KEY secret is set

## Next Steps

- Configure email templates in Authentication → Email Templates
- Set up custom domains in Project Settings → General
- Enable additional auth providers (Google, GitHub, etc.)
- Configure storage buckets if needed
