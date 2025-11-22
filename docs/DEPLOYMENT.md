# Deployment Guide

This guide covers deploying He Said / She Said to production.

## Prerequisites

- Vercel account (for frontend)
- Supabase account (for backend and edge functions)
- OpenAI API key
- MoonPay account (optional, for payments)
- Domain name (optional)

## Step 1: Deploy Database

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Note your project URL and anon key

2. **Run Migrations**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Push migrations
   supabase db push
   ```

3. **Verify Tables**
   - Check that all tables are created in the Table Editor
   - Verify RLS policies are enabled

## Step 2: Deploy Edge Functions

```bash
# Deploy the AI translation function
supabase functions deploy ai-translate

# Set secrets
supabase secrets set OPENAI_API_KEY=your_openai_key
```

Test the function:
```bash
curl -i --location --request POST \
  'https://your-project-ref.supabase.co/functions/v1/ai-translate' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"text":"You never listen to me!","mode":"speak"}'
```

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Option B: Using GitHub Integration

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## Step 4: Configure Environment Variables

In Vercel dashboard, go to Settings → Environment Variables:

### Production Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_MOONPAY_API_KEY=your_moonpay_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
FREE_TIER_DAILY_LIMIT=5
PREMIUM_TIER_DAILY_LIMIT=100
```

### Development Variables (Optional)
Set the same variables for "Development" environment using test keys.

## Step 5: Configure Custom Domain (Optional)

1. In Vercel, go to Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate to be provisioned

## Step 6: Configure Authentication

In Supabase dashboard:

1. Go to Authentication → URL Configuration
2. Add your production URL to "Site URL"
3. Add your production URL to "Redirect URLs"
4. Configure email templates (optional)

Example redirect URLs:
```
https://your-domain.com/*
https://your-domain.vercel.app/*
```

## Step 7: Test Production Deployment

1. Visit your deployed site
2. Test sign up flow
3. Test translation in both modes
4. Verify usage limits work
5. Check database to confirm data is being stored

## Step 8: Set Up Monitoring

### Vercel Analytics
1. Go to Analytics in Vercel dashboard
2. Enable Web Analytics
3. Enable Speed Insights

### Supabase Monitoring
1. Go to Database → Performance
2. Monitor query performance
3. Check edge function logs

### Error Tracking (Optional)
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- PostHog for product analytics

## Step 9: Configure CORS (If Needed)

If deploying to multiple domains, update the edge function CORS headers:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-domain.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

## Step 10: Performance Optimization

### Enable Caching
In `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
  // Enable static optimization
  generateEtags: true,
}
```

### Database Optimization
1. Review and add indexes for common queries
2. Enable connection pooling in Supabase
3. Consider read replicas for high traffic

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] RLS policies are enabled on all tables
- [ ] API keys are never exposed in client-side code
- [ ] HTTPS is enforced (automatic with Vercel)
- [ ] Content Security Policy is configured
- [ ] Rate limiting is enabled for API routes
- [ ] Webhook endpoints verify signatures
- [ ] User input is sanitized
- [ ] CORS is configured properly

## Rollback Procedure

### Vercel Rollback
1. Go to Deployments in Vercel
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Database Rollback
```bash
# Revert to previous migration
supabase db reset --db-url your-connection-string
```

### Edge Function Rollback
```bash
# Deploy previous version
git checkout <previous-commit>
supabase functions deploy ai-translate
```

## Monitoring and Alerts

Set up alerts for:
- High error rates (>1%)
- Slow response times (>3s)
- Database connection issues
- High CPU usage (>80%)
- Daily active user drops
- Failed payments

## Scaling Considerations

### When to scale:
- Database connections reach 80% capacity
- Edge function cold starts increase
- API response times degrade
- User complaints about performance

### How to scale:
1. **Supabase**: Upgrade to Pro plan for more resources
2. **Vercel**: Enable Edge Functions for faster response
3. **Caching**: Add Redis for session and rate limit caching
4. **CDN**: Use Vercel Edge Network (automatic)
5. **Database**: Enable read replicas and connection pooling

## Cost Optimization

### Free Tier Limits
- **Supabase**: 500MB database, 2GB bandwidth
- **Vercel**: 100GB bandwidth, 100 hours execution time
- **OpenAI**: Pay-per-use, ~$0.002 per translation

### Premium Tier Costs (Estimated)
- Supabase Pro: $25/month
- Vercel Pro: $20/month  
- OpenAI API: ~$50-100/month (depends on usage)
- MoonPay: Transaction fees only

## Troubleshooting Production Issues

### Users can't sign up
- Check Supabase auth logs
- Verify email provider is configured
- Check rate limits

### Translations not working
- Check edge function logs: `supabase functions logs ai-translate`
- Verify OpenAI API key is set
- Check OpenAI API usage/limits

### Database errors
- Check connection pool status
- Review RLS policies
- Check for missing indexes

### Performance issues
- Review Vercel Analytics
- Check database query performance
- Monitor edge function cold starts

## Support and Maintenance

### Regular Tasks
- [ ] Weekly: Review error logs
- [ ] Monthly: Check API usage and costs
- [ ] Monthly: Review user feedback
- [ ] Quarterly: Update dependencies
- [ ] Quarterly: Security audit

### Update Procedure
1. Test changes locally
2. Deploy to preview environment
3. Run end-to-end tests
4. Deploy to production
5. Monitor for issues
6. Rollback if needed

## Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [MoonPay Integration Docs](https://docs.moonpay.com)
